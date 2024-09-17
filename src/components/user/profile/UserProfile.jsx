// eslint-disable jsx-a11y/label-has-associated-control

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { doc, deleteDoc } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { db } from '../../../firebase/init';
import useGetUser from '../../../hooks/user/useGetUser';
import useUpdateUser from '../../../hooks/user/useUpdateUser';
import DeleteAlert from '../../DeleteAlert';

export default function UserProfile() {
  const [usp] = useSearchParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const { data: user, refetch, isLoading } = useGetUser();
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [submitted] = useState(false);
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [subscribe, setSubscribe] = useState(user?.subscribe || false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { mutate: updateUser } = useUpdateUser();

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
  };

  const handleChangeSubscribe = (e) => {
    setSubscribe(e.target.checked);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('A név megadása kötelező!'),
    birthday: Yup.date().required('A születési dátum megadása kötelező!'),
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
    profileImage: Yup.mixed(),
  });

  const handleDeleteProfile = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    setDeleteProfileId(id);
    setDeleteModal(true);
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      id: user?.id || '',
      birthday: user?.birthday || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || '',
      city: user?.city || '',
      postcode: user?.postcode || '',
      address: user?.address || '',
      subscribe: user?.subscribe || false,
    },
    validationSchema,
    onSubmit: (values) => {
      setBtnIsLoading(true);
      updateUser({
        id: user?.id,
        data: {
          name: values.name,
          birthday: values.birthday,
          email: values.email,
          phone: values.phone,
          country: values.country,
          city: values.city,
          postcode: values.postcode,
          address: values.address,
        },
      });
      setBtnIsLoading(false);
    },
  });

  useEffect(() => {
    refetch();
    formik.setValues({
      name: user?.name || '',
      id: user?.id || '',
      birthday: user?.birthday || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || '',
      city: user?.city || '',
      postcode: user?.postcode || '',
      address: user?.address || '',

      subscribe: user?.subscribe || false,
    });
  }, [user, usp]);

  return (
    isLoading || (
      <div className="flex flex-col lg:flex-row justify-center gap-3 items-center dark:text-gray-400">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">Személyes adatok</h1>
            <form
              className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3"
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="name" className="flex flex-col justify-between">
                Teljes név:
                <input
                  id="name"
                  type="text"
                  placeholder="Teljes név"
                  className="rounded-lg p-2 w-fit"
                  name="name"
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
                htmlFor="birthday"
                className="flex flex-col justify-between"
              >
                Születésnap:
                <input
                  id="birtday"
                  type="text"
                  placeholder="Születésnap"
                  className="rounded-lg p-2 w-fit"
                  name="birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span style={{ color: 'red' }}>
                  {!formik.errors.birthday && formik.touched.birthday
                    ? ''
                    : formik.errors.birthday}
                </span>
              </label>
              <label
                htmlFor="password"
                className="flex flex-col justify-between"
              >
                Új jelszó:
                <input
                  id="password"
                  type="password"
                  placeholder="Új jelszó"
                  className="rounded-lg p-2 w-fit"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <label
                htmlFor="passwordAgain"
                className="flex flex-col justify-between"
              >
                Jelszó újra:
                <input
                  id="passwordAgain"
                  type="password"
                  placeholder="Jelszó újra"
                  className="rounded-lg p-2 w-fit"
                  name="passwordAgain"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </label>
              <label htmlFor="phone" className="flex flex-col justify-between">
                Telefonszám:
                <input
                  id="phone"
                  type="tel"
                  placeholder="Telefonszám"
                  className="rounded-lg p-2 w-fit"
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
              <label htmlFor="email" className="flex flex-col justify-between">
                Email cím:
                <input
                  id="email"
                  type="email"
                  placeholder="Email cím"
                  className="rounded-lg p-2 w-fit"
                  name="email"
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
            </form>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold m-8">Számlázási adatok</h1>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              onSubmit={formik.handleSubmit}
            >
              <label
                htmlFor="country"
                className="flex flex-col justify-between"
              >
                Ország:
                <input
                  id="country"
                  type="text"
                  placeholder="Ország"
                  className="rounded-lg p-2 w-fit"
                  name="country"
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
              <label htmlFor="city" className="flex flex-col justify-between">
                Város:
                <input
                  id="city"
                  type="text"
                  placeholder="Város"
                  className="rounded-lg p-2 w-fit"
                  name="city"
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
                htmlFor="postcode"
                className="flex flex-col justify-between"
              >
                Irányítószám:
                <input
                  id="postcode"
                  type="number"
                  placeholder="Irányítószám"
                  className="rounded-lg p-2 w-fit"
                  name="postcode"
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
                htmlFor="address"
                className="flex flex-col justify-between"
              >
                Cím:
                <input
                  id="address"
                  type="text"
                  placeholder="Cím"
                  className="rounded-lg p-2 w-fit"
                  name="address"
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
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <label htmlFor="subscribe-checkbox" className="text-lg mr-4 ">
              Hírlevél feliratkozás:
            </label>
            <input
              type="checkbox"
              id="subscribe-checkbox"
              checked={subscribe}
              className="mr-2 ml-2"
              onChange={handleChangeSubscribe}
            />{' '}
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              disabled={btnIsLoading}
              className="bg-black text-lime-400 font-bold py-2 px-4 rounded-full w-full disabled:bg-white dark:bg-gray-800"
            >
              {btnIsLoading ? 'Módosítás folyamatban...' : 'Módosítás'}
            </button>
          </div>
          <div className="flex flex-col items-center mt-6">
            <button
              type="button"
              className="bg-black rounded-full text-lime-400 font-bold py-2 px-4 w-full dark:bg-gray-800"
              onClick={() => handleDeleteProfile(user.id)}
            >
              Profil törlése
            </button>
            {deleteProfileId === user.id && (
              <DeleteAlert
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                name={user.name}
                id={user.id}
                deleteItem={handleDeleteProfile}
                onClose={() => setDeleteProfileId(null)}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}
