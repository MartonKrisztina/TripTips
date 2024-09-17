// eslint-disable jsx-a11y/label-has-associated-control

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';

import UploadImage from '../../../services/UploadImage';
import useGetUser from '../../../hooks/user/useGetUser';
import useUpdateAdmin from '../../../hooks/admin/useUpdateAdmin';
import DeleteAlert from '../../DeleteAlert';
import useDeleteProfile from '../../../hooks/admin/useDeleteProfile';

export default function AdminProfile() {
  const [usp] = useSearchParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const { data: user, refetch, isLoading } = useGetUser();
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [submitted] = useState(false);
  const { mutate: updateUser } = useUpdateAdmin();
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { mutate: deleteProfile } = useDeleteProfile();
  const handleDeleteProfile = async (id) => {
    setDeleteProfileId(id);
    setDeleteModal(true);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
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

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      birthday: user?.birthday || '',
      phone: user?.phone || '',
      country: user?.country || '',
      postcode: user?.postcode || '',
      city: user?.city || '',
      address: user?.address || '',
      profileImage: user?.profileImage || '',
    },
    validationSchema,
    onSubmit: (values) => {
      setBtnIsLoading(true);
      updateUser({
        id: user.id,
        data: {
          name: values.name,
          birthday: values.birthday,
          email: values.email,
          phone: values.phone,
          country: values.country,
          postcode: values.postcode,
          city: values.city,
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
      email: user?.email || '',
      birthday: user?.birthday || '',
      phone: user?.phone || '',
      country: user?.country || '',
      postcode: user?.postcode || '',
      city: user?.city || '',
      address: user?.address || '',
      profileImage: user?.profileImage || '',
    });
  }, [user, usp]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const downloadURL = await UploadImage(file, `profileImages/${file.name}`);
    formik.setFieldValue('profileImages', downloadURL);
    updateUser({ id: user?.id, data: user });
  };

  return (
    isLoading || (
      <div className="flex flex-col justify-center items-center space-y-8 bg-lime-400 bg-opacity-25 rounded-xl pl-16 pr-16 dark:bg-gray-500 dark:text-gray-200">
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-4xl lg:text-4xl  xl:text-5xl 2xl:text-5xl italic font-bold dark:text-gray-800">
            Admin profil
          </h1>
        </div>
        <div className="flex justify-center items-center">
          {user?.profileImage && (
            <img
              src={user?.profileImage}
              alt="Profilkép"
              className="2xl:w-56 h-56 rounded-full bg-gray-200 mb-4 mr-10"
            />
          )}
          <div className=" w-56 md:w-full 2xl:w-192">
            <div className="font-bold text-base lg:text-xl 2xl:text-2xl  md:w-96">
              Teljes név: {user?.name}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <div className=" border-t-2 text-base lg:text-xl 2xl:text-2xl">
              Email: {user?.email}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <div className="text-base lg:text-xl 2xl:text-2xl">
              Születésnap: {user?.birthday}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <div className="text-base lg:text-xl 2xl:text-2xl">
              Irányítószám: {user?.postcode}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <div className="text-base lg:text-xl 2xl:text-2xl">
              Város: {user?.city}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <div className="text-base lg:text-xl 2xl:text-2xl">
              Cím: {user?.address}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <div className="text-base lg:text-xl 2xl:text-2xl">
              Ország: {user?.country}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <div className="text-base lg:text-xl 2xl:text-2xl">
              Telefonszám: {user?.phone}
            </div>
            <hr className="mb-5 border-lime-500 border-t-2" />
            <label
              htmlFor="profile-image-upload"
              className="cursor-pointer mt-4 bg-lime-500 text-black font-bold py-2 px-4 rounded "
            >
              Töltsd fel a profilképed
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-image-upload"
                onChange={handleImageUpload}
              />
            </label>
            {deleteProfileId === user?.id && (
              <DeleteAlert
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                name={user.name}
                id={user.id}
                deleteItem={deleteProfile}
                onClose={() => setDeleteProfileId(null)}
              />
            )}
            <button
              type="button"
              className="bg-black text-lime-400 font-bold py-2 px-4 rounded w-52 mt-4 dark:bg-gray-800"
              onClick={() => handleDeleteProfile(user.id)}
            >
              Profil törlése
            </button>
          </div>
        </div>
        <div className="border-r border-l border-gray-300" />
        <div className="md:w-96">
          <div className=" text-center">
            <h1 className="text-3xl md:text-4xl lg:text-4xl  xl:text-5xl 2xl:text-5xl italic font-bold mb-8 mt-8">
              Személyes adatok módosítása
            </h1>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className=" text-base lg:text-xl 2xl:text-3xl"
          >
            <div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Teljes név:
                  <input
                    id="name"
                    type="text"
                    placeholder="Teljes név"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.name && formik.touched.name
                      ? ''
                      : formik.errors.name}
                  </span>
                </label>
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Születésnap:
                  <input
                    id="birthday"
                    type="text"
                    placeholder="Születésnap"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.birthday && formik.touched.birthday
                      ? ''
                      : formik.errors.birthday}
                  </span>
                </label>

                <label
                  htmlFor="phone"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Telefonszám:
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Telefonszám"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.phone && formik.touched.phone
                      ? ''
                      : formik.errors.phone}
                  </span>
                </label>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Email cím:
                  <input
                    id="email"
                    type="email"
                    placeholder="Email cím"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.email && formik.touched.email
                      ? ''
                      : formik.errors.email}
                  </span>
                </label>
                <label
                  htmlFor="password"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Új jelszó:
                  <input
                    id="password"
                    type="password"
                    placeholder="Új jelszó"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </label>
                <label
                  htmlFor="passwordAgain"
                  className="block mb-2 relative text-base lg:text-xl 2xl:text-2xl"
                >
                  Jelszó újra:
                  <input
                    id="passwordAgain"
                    type="password"
                    placeholder="Jelszó újra"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="passwordAgain"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                </label>

                <label
                  htmlFor="country"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Ország:
                  <input
                    id="country"
                    type="text"
                    placeholder="Ország"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.country && formik.touched.country
                      ? ''
                      : formik.errors.country}
                  </span>
                </label>
                <label
                  htmlFor="postcode"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Irányítószám:
                  <input
                    id="postcode"
                    type="text"
                    placeholder="Irányítószám"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="postcode"
                    value={formik.values.postcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.postcode && formik.touched.postcode
                      ? ''
                      : formik.errors.postcode}
                  </span>
                </label>
                <label
                  htmlFor="city"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Város:
                  <input
                    id="city"
                    type="text"
                    placeholder="Város"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.city && formik.touched.city
                      ? ''
                      : formik.errors.city}
                  </span>
                </label>

                <label
                  htmlFor="address"
                  className="block mb-2 text-base lg:text-xl 2xl:text-2xl"
                >
                  Cím:
                  <input
                    id="address"
                    type="text"
                    placeholder="Cím"
                    className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none dark:text-gray-600"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    style={{ color: 'red' }}
                    className="text-base lg:text-lg 2xl:text-xl"
                  >
                    {!formik.errors.address && formik.touched.address
                      ? ''
                      : formik.errors.address}
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                onClick={formik.handleSubmit}
                disabled={submitted || btnIsLoading}
                className="bg-black text-lime-400 font-bold py-2 px-4 rounded w-full mb-20 mt-10 disabled:bg-white dark:bg-gray-800"
              >
                {btnIsLoading ? 'Módosítás folyamatban...' : 'Módosítás'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
