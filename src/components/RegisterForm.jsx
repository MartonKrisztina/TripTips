import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider';

const initialFormValues = {
  name: '',
  birthday: '',
  address: '',
  city: '',
  postcode: '',
  country: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  subscribe: false,
};

export default function RegisterForm({ setModal }) {
  const [formData, setFormData] = useState(initialFormValues);
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

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
    password: Yup.string()
      .required('A jelszó megadása kötelező!')
      .min(8, 'A jelszó legalább 8 karakter hosszú kell,hogy legyen!')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)/,
        'Legalább egy nagybetűt (A-Z) és egy számjegyet kell tartalmaznia!'
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'A jelszavaknak meg kell egyezniük!')
      .required('A jelszó megerősítése kötelező'),
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { success, error } = await register(values);
      if (success) {
        navigate('/');
        setModal(false);
      }
      if (error) {
        alert(error);
      }
      resetForm();
    },
  });

  return (
    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Regisztráció
        </h1>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
              required
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
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Születési dátum
            <input
              type="text"
              id="birthday"
              placeholder="éééé.hh.nn."
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
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
            htmlFor="address"
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cím
            <input
              type="text"
              id="address"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Utca, házszám"
              required
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

          <label
            htmlFor="city"
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Város
            <input
              type="text"
              id="city"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Város"
              required
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
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Irányítószám
            <input
              type="text"
              id="postcode"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Irányítószám"
              required
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
            htmlFor="country"
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ország
            <input
              type="text"
              id="country"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ország"
              required
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

          <label
            htmlFor="email"
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
            <input
              type="text"
              id="email"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email@email.com"
              required
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

          <label
            htmlFor="phone"
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Telefonszám
            <input
              type="text"
              id="phone"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+36-xx-xxx-xx-xx"
              required
              name="phone"
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

          <label
            htmlFor="password"
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jelszó
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span style={{ color: 'red' }}>
              {!formik.errors.password && formik.touched.password
                ? ''
                : formik.errors.password}
            </span>
          </label>

          <label
            htmlFor="confirm-password"
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jelszó megerősítése
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span style={{ color: 'red' }}>
              {!formik.errors.confirmPassword && formik.touched.confirmPassword
                ? ''
                : formik.errors.confirmPassword}
            </span>
          </label>
          <div className="flex items-start">
            <div className=" text-sm">
              <label
                htmlFor="terms"
                className="flex gap-2 font-light text-gray-500 dark:text-gray-300"
              >
                <input
                  id="subscribe"
                  type="checkbox"
                  className="w-4 h-4 border border-lime-400 text-lime-700 rounded bg-gray-50 focus:ring-3 focus:ring-lime-200"
                  onChange={() =>
                    setFormData({
                      ...formData,
                      subscribe: !formData.subscribe,
                    })
                  }
                  checked={formData.subscribe}
                />
                Feliratkozás hírlevélre
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-black bg-lime-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Regisztráció
          </button>
        </form>
      </div>
    </div>
  );
}
