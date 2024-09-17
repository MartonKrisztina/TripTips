import { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useGetCategoryById from '../../../hooks/tours/useGetCategoryById';
import useUpdateCategory from '../../../hooks/tours/useUpdateCategory';

export default function UpdateCategory({ updateModal, setUpdateModal }) {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { data: category, refetch } = useGetCategoryById(
    searchParams.get('id') || ''
  );
  const { mutate: updateCategory } = useUpdateCategory();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Kötelező a kategória nevének megadása!'),
    tools: Yup.string().required('Legalább egy szükséges eszközt adjon meg!'),
  });

  const formik = useFormik({
    initialValues: {
      name: category?.name || '',
      tools: category?.tools || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await updateCategory({
          id: searchParams.get('id') || '',
          data: {
            name: values.name,
            tools: values.tools,
          },
        });
        setIsLoading(false);
        setUpdateModal(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    refetch();
    formik.setValues({
      name: category?.name || '',
      tools: category?.tools || '',
    });
  }, [searchParams, category]);

  return (
    <div>
      <Modal
        show={updateModal}
        size="md"
        onClose={() => {
          if (updateModal) setUpdateModal(false);
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Kategória módosítása</h1>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center space-y-4 w-95"
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-base mb-1">
                Kategória neve:
                <input
                  type="text"
                  placeholder="Kategória név"
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <span style={{ color: 'red' }}>{formik.errors.name}</span>
                )}
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
                {formik.touched.tools && formik.errors.tools && (
                  <span style={{ color: 'red' }}>{formik.errors.tools}</span>
                )}
              </label>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-lime-400 font-bold py-2 px-4 rounded w-full mb-20 mt-10"
              >
                {isLoading ? 'Küldés folyamatban...' : 'Küldés'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
