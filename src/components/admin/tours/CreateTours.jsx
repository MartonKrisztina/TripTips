import { Label, Modal, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useReadCategories from '../../../hooks/tours/useReadCategories';
import travelTypeOptions from '../../../utils/travelTypeOptions';
import useCreateTours from '../../../hooks/tours/useCreateTours';
import UploadImage from '../../../services/UploadImage';

const initialFormValues = {
  address: '',
  amount: 0,
  date: '',
  description: '',
  name: '',
  price: 0,
  travelType: '',
  categories: '',
  tourImage: '',
};

export default function CreateTours({ toursModal, setToursModal }) {
  const { data: categories, refetch } = useReadCategories();
  const { mutate } = useCreateTours();

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const travelTypeOption = travelTypeOptions;

  const validationSchema = Yup.object().shape({
    address: Yup.string().required(
      'A helyszín megadása kötelező! (ország,város)'
    ),
    amount: Yup.number().required(
      'Maximum résztvevők számának megadása kötelező!'
    ),
    date: Yup.date().required('A kirándulás dátumának megadása kötelező!'),
    description: Yup.string()
      .required('A leírás kötelező!')
      .min(30, 'Legalább 30 karakter hosszú legyen a leírás!'),
    name: Yup.string().required('A kirándulás megnevezése kötelező!'),
    price: Yup.number().required('A kirándulás árának megadása kötelező!'),
    travelType: Yup.string().required('Kötelező választani utazási típust!'),
    categories: Yup.string().required('Kötelező választani kategóriát'),
    tourImage: Yup.mixed().required('Egy kép feltöltése kötelező!'),
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setSubmitted(true);
        setIsLoading(true);

        if (
          !values.address ||
          Number.isNaN(values.amount) ||
          !values.date ||
          !values.description ||
          !values.name ||
          Number.isNaN(values.price) ||
          !values.categories ||
          !values.tourImage
        ) {
          setSubmitted(false);
          setIsLoading(false);
          return;
        }

        await mutate(values);
        setToursModal(false);
        refetch();
      } catch (error) {
        setIsLoading(false);
      }

      resetForm();
    },
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    const downloadURL = await UploadImage(file, `tourImage/${file.name}`);
    formik.setFieldValue('tourImage', downloadURL);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Modal
        show={toursModal}
        size="md"
        onClose={() => {
          if (toursModal) setToursModal(false);
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Kirándulás felvitele</h1>
          </div>
          <form
            className="flex flex-col justify-center space-y-4 w-95"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-base mb-1">
                Kirándulás neve:
                <input
                  type="text"
                  placeholder="Név"
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
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
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-base mb-1">
                Dátum:
                <input
                  type="date"
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span style={{ color: 'red' }}>
                  {!formik.errors.date && formik.touched.date
                    ? ''
                    : formik.errors.date}
                </span>
              </label>
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="text-base mb-1">
                Helyszín:
                <input
                  type="text"
                  placeholder="Ország,város"
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
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
            </div>
            <div className="flex flex-col">
              <label htmlFor="descriptopn" className="text-base mb-1">
                Kirándulás leírása:
                <textarea
                  type="text"
                  placeholder="Kirándulás leírása..."
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span style={{ color: 'red' }}>
                  {!formik.errors.description && formik.touched.description
                    ? ''
                    : formik.errors.description}
                </span>
              </label>
            </div>
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-base mb-1">
                Férőhelyek száma:
                <input
                  type="number"
                  placeholder="Szabad férőhelyek száma"
                  id="amount"
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span style={{ color: 'red' }}>
                  {!formik.errors.amount && formik.touched.amount
                    ? ''
                    : formik.errors.amount}
                </span>
              </label>
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="text-base mb-1">
                Ár:
                <input
                  type="number"
                  placeholder="Ár"
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
                  id="price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span style={{ color: 'red' }}>
                  {!formik.errors.price && formik.touched.price
                    ? ''
                    : formik.errors.price}
                </span>
              </label>
            </div>
            <div className="mb-2 block">
              <Label
                htmlFor="categories"
                value="Kérlek, válassz az alábbiak közül:"
              />
            </div>
            <Select
              id="categories"
              name="categories"
              value={formik.values.categories}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Kategóriák</option>

              {categories?.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </Select>

            {formik.touched.categories && formik.errors.categories && (
              <div style={{ color: 'red' }}>{formik.errors.categories}</div>
            )}

            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">
                Utazás menete a kirándulás helyszínére:
              </legend>
              {travelTypeOption.map(({ id, name }) => (
                <div key={id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`travelType-${id}`}
                    name="travelType"
                    value={name}
                    checked={formik.values.travelType === name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor={`travelType-${id}`}>{name}</label>
                </div>
              ))}
            </fieldset>

            {formik.touched.travelType && formik.errors.travelType && (
              <div style={{ color: 'red' }}>{formik.errors.travelType}</div>
            )}

            <div className="flex flex-col">
              {formik.values.tourImage && (
                <img
                  src={formik.values.tourImage}
                  alt="Current tour"
                  className="w-40 h-40 rounded-lg mb-2"
                />
              )}
              <label
                htmlFor="tourImage"
                className="cursor-pointer bg-lime-500 text-black font-bold text-center py-2 px-4 rounded"
              >
                {formik.values.tourImage ? 'Módosítás' : 'Töltsd fel a képet'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="tourImage"
                  name="tourImage"
                  onChange={(event) => {
                    formik.setFieldValue(
                      'tourImage',
                      event.currentTarget.files[0]
                    );
                    handleImageUpload(event);
                  }}
                />
              </label>
            </div>
            {formik.errors.tourImage && (
              <div style={{ color: 'red' }}>{formik.errors.tourImage}</div>
            )}
            <div className="mt-6">
              <button
                type="submit"
                disabled={submitted || isLoading}
                className="bg-black text-lime-400 font-bold py-2 px-4 rounded w-full mb-20 mt-5"
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
