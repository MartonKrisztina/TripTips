import { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';
import useReadAll from '../../hooks/tours/useReadAllTours';
import useAddToCart from '../../hooks/cart/useAddToCart';
import useReadCategories from '../../hooks/tours/useReadCategories';
import BackToTop from '../../utils/BackToTop';

export default function UserShopTours() {
  const { data: tours, isLoading } = useReadAll();
  const { data: categories } = useReadCategories(null, null, null);
  const [usp, setUsp] = useSearchParams();
  const [selectedTour, setSelectedTour] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const catUsp = usp.getAll('category');
    setSelectedCategories(catUsp);
  }, [usp]);

  const { mutate: addToCart } = useAddToCart();

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

  return (
    isLoading || (
      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center text-black mb-8 dark:text-gray-200">
          Túráink
        </h1>
        <div className="flex flex-col md:flex-row justify-start mb-4 space-x-4 dark:text-gray-200">
          <input
            type="text"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <div>
            <p className="font-semibold mb-2">Kategóriák:</p>
            <div className="flex flex-wrap">
              {categories?.map((category) => (
                <span
                  key={category.id}
                  className="flex items-center space-x-2 ml-4 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => {
                      const updatedCategories = selectedCategories.includes(
                        category.name
                      )
                        ? selectedCategories.filter(
                            (cat) => cat !== category.name
                          )
                        : [...selectedCategories, category.name];

                      const params = new URLSearchParams();
                      updatedCategories.forEach((cat) =>
                        params.append('category', cat)
                      );

                      setUsp(params);
                      setSelectedCategories(updatedCategories);
                    }}
                    className="form-checkbox h-3 w-3 text-lime-800"
                  />
                  <span className="text-sm">{category.name}</span>
                </span>
              ))}
            </div>
            <BackToTop />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 dark:text-gray-200">
          {tours
            ?.filter((tour) => {
              if (selectedCategories.length === 0) return true;
              return selectedCategories.includes(tour.categories);
            })
            .map((tour) => (
              <div
                key={tour.id}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 dark:bg-gray-800"
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
                  />
                </button>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{tour.name}</h2>
                  <p className="text-gray-600 dark:text-gray-200 mb-2">
                    {tour.address}
                  </p>
                  <p className="text-gray-600 dark:text-gray-200 mb-2">
                    Utazás típusa: {tour.travelType}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-sm font-semibold inline-block py-1 px-2 uppercase rounded ${getCategoryColorClass(tour.categories)} text-white`}
                    >
                      {tour.categories}
                    </span>
                    <p className="text-gray-800 font-bold">
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
              <div className="sm:w-full flex justify-between items-center">
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
      </section>
    )
  );
}
