import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TbBus } from 'react-icons/tb';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { Modal, Rating } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaPersonHiking } from 'react-icons/fa6';
import Loading from '../utils/Loading';
import bg03 from '../assets/bg03.jpg';
import footterHomePage from '../assets/footterImg-homePage.jpg';
import useReadAllTours from '../hooks/tours/useReadAllTours';
import useAddToCart from '../hooks/cart/useAddToCart';
import BackToTop from '../utils/BackToTop';

import useUpdateUser from '../hooks/user/useUpdateUser';
import useGetUser from '../hooks/user/useGetUser';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const { data: tours } = useReadAllTours();
  const { data: user } = useGetUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: addToCart } = useAddToCart();
  const [selectedTour, setSelectedTour] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('A név megadása kötelező!'),
    email: Yup.string().required('Az email cím megadása kötelező!'),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      updateUser({
        id: user.id,
        data: {
          name: values.name,
          email: values.email,
          subscribe: true,
        },
      });
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const displayedTours = tours ? tours.slice(0, 3) : [];
  const getCategoryColorClass = (category) => {
    switch (category) {
      case 'Klasszikus körutazás':
        return 'bg-blue-500';
      case 'Gyalogos túra':
        return 'bg-yellow-500';
      case 'Ünnepi körutazás':
        return 'bg-red-500';
      case 'Klasszikus városlátogatás':
        return 'bg-green-500';
      default:
        return 'bg-black-500';
    }
  };
  const openModal = (tour) => {
    setSelectedTour(tour);
  };
  const closeModal = () => {
    setSelectedTour(null);
  };
  const handleAddToCart = () => {
    if (selectedTour && selectedTour.amount > 0) {
      addToCart(selectedTour);
    }
  };

  return (
    <div>
      {!loaded ? (
        <Loading />
      ) : (
        <div className="flex-col justify-center items-center dark:text-white">
          <div className="h-96 md:max-w-full overflow-hidden flex justify-center items-center">
            <img
              src={bg03}
              alt="bghomepage"
              className="object-cover relative"
              loading="lazy"
            />

            <h1 className="uppercase absolute text-xl text-center md:text-4xl font-bold italic text-white">
              Trip Tips - Az inspiráló utazások titka
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-10 bg-lime-100 dark:border-gray-700 dark:bg-gray-600 dark:hover:bg-none">
            <div className="flex-wrap w-full ">
              <div className="flex-wrap items-center w-full md:flex gap-4 md:gap-7 p-4">
                <div className="home-page-icon-box flex flex-col items-center justify-center text-center md:w-1/3 my-4 md:flex-1">
                  <div className="flex justify-center mb-2">
                    <TbBus className="text-4xl md:text-5xl  lg:text-6xl xl:text-7xl 2xl:text-8xl" />
                  </div>
                  <ul className="text-center list-none text-sm  md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl ">
                    <li>
                      <h6 className="font-bold">Kényelem</h6>
                    </li>
                    <li>Légkondicionálás és fűtés</li>
                    <li>Megfelelő lábtér</li>
                    <li>Tisztaság és higiénia</li>
                  </ul>
                </div>
                <div className="home-page-icon-box flex flex-col items-center text-center md:w-1/3 my-4 md:flex-1 ">
                  <div className="flex justify-center mb-2 ">
                    <MdOutlineHealthAndSafety className="text-4xl md:text-5xl  lg:text-6xl xl:text-7xl 2xl:text-8xl" />
                  </div>
                  <ul className="text-center list-none text-sm md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                    <li>
                      <h6 className="font-bold">Biztonság</h6>
                    </li>
                    <li>Széleskörű fedezet</li>
                    <li>Partner biztosítók</li>
                    <li>Kiváló ügyfélszolgálat</li>
                  </ul>
                </div>
                <div className="home-page-icon-box flex flex-col items-center text-center w-full md:w-1/3 my-4  md:flex-1">
                  <div className="flex justify-center mb-2">
                    <FaPersonHiking className="text-4xl md:text-5xl  lg:text-6xl xl:text-7xl 2xl:text-8xl" />
                  </div>
                  <ul className="text-center list-none text-sm md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                    <li>
                      <h6 className="font-bold">Élmény</h6>
                    </li>
                    <li>Tapasztalt idegenvezetők</li>
                    <li>Exkluzív programok</li>
                    <li>Elérhető árak </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-7 lg:flex-row justify-between items-center mb-4">
                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 2xl:m-4 2xl:p-2 md:mr-4">
                  <h2 className="text-3xl md:text-5xl italic text-center md:text-left">
                    Legnépszerűbb ajánlataink:
                  </h2>
                </div>
                <div className=" md:w-1/2  lg:w-2/3 xl:w-2/3 2xl:w-1/2  mt-4 md:mt-0">
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-center md:text-left">
                      Nálunk minden út egy kalandra invitál! Válassz a számtalan
                      program közül és fedezd fel a világot velünk!
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex justify-center md:justify-start">
                    <Link
                      to="/tours"
                      className="inline-block bg-lime-500 hover:bg-lime-600 text-white text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl dark:bg-gray-800 dark:border-none font-bold py-2 px-4 rounded"
                    >
                      Lássam a többi ajánlatot
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {displayedTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 dark:bg-gray-800 dark:text-gray-200"
                  >
                    <button
                      type="button"
                      className="w-full object-cover object-center cursor-pointer"
                      onClick={() => openModal(tour)}
                    >
                      <img
                        src={tour.tourImage}
                        alt={tour.title}
                        className="w-full h-64 object-cover object-center cursor-pointer"
                        loading="lazy"
                      />
                    </button>
                    <div className="p-4">
                      <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-semibold mb-2">
                        {tour.name}
                      </h2>

                      <p className="text-gray-600 mb-2 md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl dark:text-gray-400">
                        {tour.address}
                      </p>

                      <p className="text-gray-600 mb-2 md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl dark:text-gray-400">
                        Utazás típusa: {tour.travelType}
                      </p>
                      <div className="flex justify-between gap-2 items-center mt-4">
                        <span
                          className={`text-sm font-semibold  py-1 px-2 uppercase rounded ${getCategoryColorClass(tour.categories)} text-white`}
                        >
                          {tour.categories}
                        </span>
                        <p className="text-gray-800 font-bold md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                          {tour.price.toLocaleString('hu-HU', {
                            minimumFractionDigits: 0,
                          })}{' '}
                          Ft
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedTour && (
                <Modal
                  dismissible
                  show={openModal}
                  className="bg-white rounded-lg p-8 "
                  onClose={closeModal}
                >
                  <Modal.Body>
                    <h2 className="text-xl font-semibold mb-4">
                      {selectedTour.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{selectedTour.address}</p>
                    <p className="text-gray-700 mb-4 max-h-[400px] overflow-y-auto">
                      {selectedTour.description}
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="md:w-full flex justify-between items-center">
                      <span
                        className={`text-sm font-semibold inline-block w-100 py-1 px-2 uppercase rounded ${getCategoryColorClass(selectedTour.categories)} text-white`}
                      >
                        {selectedTour.categories}
                      </span>
                      <div className=" justify-between">
                        <button
                          type="button"
                          className={`px-6 py-2 rounded ${
                            selectedTour.amount > 0
                              ? 'bg-lime-600 text-white'
                              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                          }`}
                          onClick={handleAddToCart}
                          disabled={selectedTour.amount === 0}
                        >
                          Kosárba
                        </button>
                      </div>
                    </div>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
            <div className="w-full flex-col items-center md:mb-10">
              <div className="w-full mb-5">
                <h2 className="flex-wrap text-3xl md:text-5xl italic text-center md:text-left">
                  Akik már velünk utaztak:
                </h2>
              </div>
              <div className="home-page-comment-mainbox flex-col  gap-4 md:flex  lg:flex-row xl:flex 2xl:flex ml-2 mr-2">
                <div className="home-page-comments text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-2 mb-2">
                  <p>
                    Nagyon jó döntés volt, hogy titeket választottunk! A kiváló
                    idegenvezetésnek köszönhetően rengeteget tanultunk és még
                    jobban élveztük az utat. Köszönjük a szervezést!
                  </p>
                  <div className="flex justify-around items-center mt-3">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                    </Rating>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                      2023.júl
                    </p>
                  </div>
                </div>
                <div className="home-page-comments text-sm  md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-2 mb-2">
                  <p>
                    A kirándulás összességében nagyon jó volt, de sajnos néhány
                    kisebb probléma is volt. Az időjárás kevésbé volt kegyes
                    hozzánk, és néhány útvonalon nehézkes volt a haladás. Ennek
                    ellenére fantasztikus tájakat láthattunk és jó közösségben
                    voltunk!
                  </p>
                  <div className="flex justify-around items-center mt-3">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                      2023.szept
                    </p>
                  </div>
                </div>
                <div className="home-page-comments text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-2 mb-2">
                  <p>
                    Az adventi vásár nagyon hangulatos volt! Csodálatos díszek,
                    finom sütemények és meleg italok vártak minket. Remek
                    választás volt részt venni ezen a csodás rendezvényen!
                  </p>
                  <div className="flex justify-around items-center mt-3">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                    </Rating>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                      2023.dec
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-page-footter-img md:max-w-full  flex justify-end items-center relative">
              <img
                src={footterHomePage}
                alt="bghomepage"
                className="object-cover w-full h-auto"
                loading="lazy"
              />
              <div className="w-fitt absolute inset-0 bg-gradient-to-b from-lime-100 dark:from-gray-600 to-transparent">
                <div className="w-1/2 home-page-newsletter-box bg-transparent md:mt-12 lg:mt-14 xl:mt-16 2xl:mt-20">
                  <form
                    className="  max-w-md  bg-transparent home-page-newsletter-form md:w-1/3"
                    onSubmit={formik.handleSubmit}
                  >
                    <h1
                      className="text-2xl italic md:text-3xl lg:text-5xl xl:text-5xl 2xl:text-6xl"
                      id="subscribing"
                    >
                      Íratkozzon fel hírlevelünkre
                    </h1>
                    <div className="relative z-0 w-full mb-5 group ">
                      <label htmlFor="name" className="text-base mb-1">
                        <input
                          type="text"
                          placeholder="Email cím"
                          className="block py-2.5 px-0 w-full text-sm md:text-2xl lg:text-2xl xl:text-xl 2xl:text-2xl md:mt-3 text-gray-900 bg-transparent border-0 border-b-2 border-lime-500 appearance-none dark:text-white dark:border-lime-500 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-500 peer"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span
                          style={{ color: 'red' }}
                          className="text-sm md:text-xl lg:text-lg xl:text-xl 2xl:text-xl md:mt-3"
                        >
                          {!formik.errors.email && formik.touched.email
                            ? ''
                            : formik.errors.email}
                        </span>
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <label htmlFor="name" className="text-base mb-1">
                        <input
                          type="text"
                          placeholder="Felhasználó név"
                          className="block py-2.5 px-0 w-full text-sm md:text-2xl lg:text-2xl xl:text-xl 2xl:text-2xl md:mt-3 text-gray-900 bg-transparent border-0 border-b-2 border-lime-500 appearance-none dark:text-white dark:border-lime-500 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-500 peer"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span
                          style={{ color: 'red' }}
                          className="text-sm md:text-xl lg:text-lg xl:text-xl 2xl:text-xl  md:mt-3"
                        >
                          {!formik.errors.name && formik.touched.name
                            ? ''
                            : formik.errors.name}
                        </span>
                      </label>
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="bg-lime-500 text-white font-bold py-2 px-4 rounded w-full mb-32 md:mb-20 text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl  md:mt-3 "
                      >
                        Feliratkozás
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="uppercase absolute font-bold md:text-white lg:text-white xl:text-white 2xl:text-white ml-1 mr-1 md:ml-2 md:mr-2 lg:ml-2 lg:mr-2 xl:ml-2 xl:mr-2 2xl:ml-2 2xl:mr-2">
                <div className="flex justify-center">
                  <h2 className="text-base md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl md:mb-16 lg:mb-16 xl:mb-16 2xl:mb-14">
                    Partnereink
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl ">
                  <div>SafeTravel Biztosító Zrt.</div>
                  <div>VárosTúra Kft.</div>
                  <div>TravelSafe Assistance Zrt.</div>
                  <div>CityBus Utazások Kft.</div>
                  <div>TravelGuard Biztosító Zrt.</div>
                  <div>UtazásExpress Kft.</div>
                  <div>Borjárat Kft.</div>
                  <div>Borvadászat Kft.</div>
                  <div>Ízbúvár Kft.</div>
                </div>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      )}
    </div>
  );
}
