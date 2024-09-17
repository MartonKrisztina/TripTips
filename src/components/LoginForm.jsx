import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider';
import { notifySuccess } from '../utils/toast';

const initialFormValues = {
  email: '',
  password: '',
};

export default function LoginForm({ setModal }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Az email cím megadása kötelező!'),
    password: Yup.string().required('A jelszó megadása kötelező!'),
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { success, error } = await login(values);
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
          Bejelentkezés
        </h1>
        <form
          className="p-10 rounded-md flex flex-col gap-3"
          onSubmit={formik.handleSubmit}
        >
          <label
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="email"
          >
            Email:
            <input
              type="email"
              id="email"
              required
              className="bg-lime-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex flex-col w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="password"
          >
            Jelszó:
            <input
              type="password"
              id="password"
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
          <button
            type="submit"
            className="p-3 bg-lime-200 rounded-lg hover:bg-lime-400"
          >
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
}
