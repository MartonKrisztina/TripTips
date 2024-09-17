import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useCreateMessage from '../../hooks/contact/useCreateMessage';

const position = [47.5288, 19.03807];
const initialFormValues = {
  name: '',
  email: '',
  phonenumber: '',
  message: '',
  date: '',
};

export default function Contact() {
  const createMessageMutation = useCreateMessage();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('A név megadása kötelező!'),
    email: Yup.string().required('Az email cím megadása kötelező!'),
    phonenumber: Yup.string()
      .matches(/^\+?\d{9,}$/, 'Helytelen telefonszám formátum!')
      .required('A telefonszám megadása kötelező!'),
    message: Yup.string()
      .required('Üzenet írása kötelező!')
      .min(5, 'Legalább 5 karakter hosszú legyen a leírás!'),
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      const updatedValues = { ...values, date: formattedDate };

      await createMessageMutation.mutateAsync(updatedValues);
      resetForm();
    },
  });

  return (
    <div className="container mx-auto px-4 dark:text-gray-400">
      <div className="flex flex-col md:flex-row my-8">
        <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold flex items-center">Trip Tips</h1>
          <p className="mt-2 flex items-center">
            <FaPhoneAlt className="text-lime-400 mr-2" /> Telefon: +123 456 789
          </p>
          <p className="mt-1 flex items-center">
            <FaMapMarkerAlt className="text-lime-400 mr-2" /> Cím: 1036
            Budapest, Bécsi út 53-55., I.emelet
          </p>
          <p className="mt-1 flex items-center">
            <MdEmail className="text-lime-400 mr-2" /> E-mail cím:
            triptips@gmail.com
          </p>
          <div className="h-96 mr-10 mt-8 border-2 border-lime-400 rounded-lg relative z-20">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>Budapest, Bécsi út 53-55., I.emelet</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="w-full md:w-1/2 pl-0 md:pl-4">
          <h1 className="text-3xl font-bold mb-8">Írj nekünk!</h1>
          <form
            className="flex flex-col space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-base mb-1">
                Teljes név:
                <input
                  type="text"
                  placeholder="Teljes név"
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
              <label htmlFor="email" className="text-base mb-1">
                Email cím:
                <input
                  type="email"
                  placeholder="email@email.com"
                  className="rounded-lg p-2 w-full border-2 border-lime-400 focus:outline-none"
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
            </div>
            <div className="flex flex-col">
              <label htmlFor="phonenumber" className="text-base mb-1">
                Telefonszám:
                <input
                  type="text"
                  placeholder="+36-xx-xxx-xx-xx"
                  className="rounded-lg p-2 mb-2 w-full border-2 border-lime-400 focus:outline-none"
                  name="phonenumber"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span style={{ color: 'red' }}>
                  {!formik.errors.phonenumber && formik.touched.phonenumber
                    ? ''
                    : formik.errors.phonenumber}
                </span>
              </label>
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-base mb-1">
                Üzenet:
                <textarea
                  placeholder="Üzenet nekünk"
                  className="rounded-lg p-2 mb-2 w-full h-24 border-2 border-lime-400 focus:outline-none"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div style={{ color: 'red' }}>
                  {!formik.errors.message && formik.touched.message
                    ? ''
                    : formik.errors.message}
                </div>
              </label>
            </div>
            <button
              type="submit"
              className="bg-black text-lime-400 font-bold py-2 px-4 rounded w-full"
            >
              Elküldés
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
