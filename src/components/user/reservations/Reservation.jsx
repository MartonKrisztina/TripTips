import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CartContext from '../../../contexts/CartProvider';
import useGetCart from '../../../hooks/cart/useGetCart';
import useGetUser from '../../../hooks/user/useGetUser';
import useCreateReservation from '../../../hooks/reservation/useCreateReservation';
import generateUniqueId from '../../../utils/UniqueId';

export default function Order() {
  const { cart } = useContext(CartContext);
  const { data, isLoading, isError } = useGetCart();
  const { data: userData, refetch } = useGetUser();
  const { mutate: reservate } = useCreateReservation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('A név megadása kötelező!'),
    address: Yup.string().required(
      'A lakcím megadása kötelező! (utca,házszám)'
    ),
    city: Yup.string().required('A lakcím megadása kötelező! (város)'),
    postcode: Yup.number().required(
      'A lakcím írányítószámának megadása kötelező!'
    ),
    country: Yup.string().required('Az ország megadása kötelező! '),
    email: Yup.string().required('Az email cím megadása kötelező!'),
    phone: Yup.string()
      .matches(/^\+?\d{9,}$/, 'Helytelen telefonszám formátum!')
      .required('A telefonszám megadása kötelező!'),
  });

  const formik = useFormik({
    initialValues: {
      id: cart,
      orderDate: new Date().toISOString(),
      name: userData?.name || '',
      postcode: userData?.postcode || '',
      city: userData?.city || '',
      address: userData?.address || '',
      country: userData?.country || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
    },
    onSubmit: () => {
      reservate({
        user: formik.values,
        reservations: data?.reservations || [],
        total:
          data?.reservations.reduce(
            (total, item) => total + Number(item.price),
            0
          ) || 0,
      });
      navigate('/');
    },
    validationSchema,
  });

  useEffect(() => {
    refetch();
    formik.setValues({
      ...formik.values,
      id: cart,
      name: userData?.name || '',
      postcode: userData?.postcode || '',
      city: userData?.city || '',
      address: userData?.address || '',
      country: userData?.country || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
    });
  }, [userData, data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <section className="w-full flex flex-col gap-5">
      <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-400">
        Foglalás összegzése
      </h1>
      <div className="w-full flex flex-col items-center border-2 rounded-lg shadow-lg">
        <div className="bg-lime-100 w-full p-5 flex flex-col gap-5 dark:bg-gray-400">
          <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
            Kosár tartalma
          </p>
          {data?.reservations.map((item, index) => (
            <div
              key={`${item.id}-${generateUniqueId()}`}
              className={`border-b border-lime-800 ${index !== 0 ? 'mt-4' : ''}  pb-2`}
            >
              <h3 className="text-base italic mb-3 font-semibold leading-6 text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm mb-2 leading-none text-gray-800">
                <span className="text-gray-800 font-semibold">Ország: </span>{' '}
                {item.address}
              </p>
              <p className="text-sm mb-2 leading-none text-gray-800">
                <span className="text-gray-800 font-semibold">
                  Utazás típusa:{' '}
                </span>{' '}
                {item.travelType}
              </p>
              <p className="text-sm mb-2 leading-none text-gray-800">
                <span className="text-gray-800 font-semibold">Dátum: </span>{' '}
                {item.date}
              </p>
              <p className="text-sm xl:text-lg leading-6 text-right ">
                {item.price.toLocaleString('hu-HU')} Ft
              </p>
            </div>
          ))}
        </div>
        <div className="bg-lime-100 p-5 w-full dark:bg-gray-400">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Személyes adatok
          </h3>
          <form
            className="grid grid-cols-2 gap-3"
            onSubmit={formik.handleSubmit}
          >
            <label
              className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="name"
            >
              Teljes név
              <input
                type="text"
                id="name"
                className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Vezetéknév Keresztnév"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.name && formik.touched.name
                  ? ''
                  : formik.errors.name}
              </span>
            </label>
            <label
              className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="postcode"
            >
              Irányítószám
              <input
                type="text"
                id="postcode"
                className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Irányítószám"
                value={formik.values.postcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.postcode && formik.touched.postcode
                  ? ''
                  : formik.errors.postcode}
              </span>
            </label>
            <label
              className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="city"
            >
              Város
              <input
                type="text"
                id="city"
                className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Város"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.city && formik.touched.city
                  ? ''
                  : formik.errors.city}
              </span>
            </label>
            <label
              className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="address"
            >
              Utca - házszám
              <input
                type="text"
                id="address"
                className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Utca-házszám"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.address && formik.touched.address
                  ? ''
                  : formik.errors.address}
              </span>
            </label>
            <label
              className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="country"
            >
              Ország
              <input
                type="text"
                id="country"
                className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ország"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.country && formik.touched.country
                  ? ''
                  : formik.errors.country}
              </span>
            </label>
            <label
              className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="email"
            >
              Email cím
              <input
                type="text"
                id="email"
                className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email cím"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.email && formik.touched.email
                  ? ''
                  : formik.errors.email}
              </span>
            </label>
            <label
              className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="country"
            >
              Telefonszám
              <input
                type="text"
                id="phone"
                className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Telefonszám"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.phone && formik.touched.phone
                  ? ''
                  : formik.errors.phone}
              </span>
            </label>
          </form>
          <div className="bg-lime-100 p-5 summary-container w-full flex flex-col dark:bg-gray-400">
            <h3 className="text-xl mb-8 font-semibold leading-5 text-gray-800">
              Összegzés
            </h3>
            <div className="border-lime-800 border-b pb-4">
              <div className="flex justify-between w-full">
                <p className="text-base leading-4 text-gray-800">Fizetendő</p>
                <p className="text-base leading-4 text-gray-600">
                  {data?.reservations
                    .reduce((total, item) => total + Number(item.price), 0)
                    .toLocaleString('hu-HU')}{' '}
                  Ft
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={formik.handleSubmit}
            className="py-5 hover:bg-lime-600 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-transparent font-medium w-full text-base leading-4 text-white bg-lime-500 rounded-md shadow-lg mt-4 dark:bg-gray-800 dark:text-lime-400"
          >
            Foglalás
          </button>
        </div>
      </div>
    </section>
  );
}
