import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'flowbite-react';
import useCreateCategory from '../../../hooks/tours/useCreateCategories';

export default function CreateCategories({ modal, setModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useCreateCategory();

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('A kategória megnevezése kötelező!'),
    tools: Yup.string().required(
      'Legalább egy szükséges eszköz megadása kötelező!'
    ),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      tools: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        await mutate({ name: values.categoryName, tools: values.tools });
        setIsLoading(false);
        setModal(false);
      } catch (error) {
        setIsLoading(false);
      }
      resetForm();
    },
  });

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <Modal show={modal} size="md" onClose={handleCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Kategória felvitele</h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center space-y-4 w-95"
        >
          <div className="flex flex-col">
            <label htmlFor="categoryName" className="text-base mb-1">
              Kategória neve:
              <input
                type="text"
                placeholder="Kategória név"
                className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
                name="categoryName"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.categoryName && formik.touched.categoryName
                  ? ''
                  : formik.errors.categoryName}
              </span>
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="tools" className="text-base mb-1">
              Szükséges eszközök:
              <input
                type="text"
                placeholder="Eszközök"
                className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
                name="tools"
                value={formik.values.tools}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: 'red' }}>
                {!formik.errors.tools && formik.touched.tools
                  ? ''
                  : formik.errors.tools}
              </span>
            </label>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={formik.isSubmitting || isLoading}
              className="bg-black text-lime-400 font-bold py-2 px-4 rounded w-full mb-20 mt-10"
            >
              {isLoading ? 'Küldés folyamatban...' : 'Küldés'}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
