import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { Select } from 'flowbite-react';
import useReadAllTours from '../../../hooks/tours/useReadAllTours';
import useDelete from '../../../hooks/tours/useDeleteTours';
import CreateTours from './CreateTours';
import UpdateTour from './UpdateTour';
import DeleteAlert from '../../DeleteAlert';

export default function AdminTours() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [newToursModalOpen, setNewToursModalOpen] = useState(false);
  const [updateTourModalOpen, setUpdateTourModalOpen] = useState(false);
  const [categoryArray] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [search, setsearch] = useState(searchParams.get('search') || '');
  const [sortField, setSortField] = useState(
    searchParams.get('sortfield') || ''
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortorder') || ''
  );
  const {
    data: tours,
    refetch,
    isLoading,
  } = useReadAllTours(
    search,
    sortField,
    sortOrder,
    categoryArray,
    itemsPerPage
  );
  const { mutate: deleteTour } = useDelete();
  const [deleteTourId, setDeleteTourId] = useState(null);
  const handleDeleteClick = (id) => {
    setDeleteTourId(id);
    setDeleteModal(true);
  };

  const categories = Array.from(
    new Set(tours?.map((tour) => tour.categories))
  ).flat();

  useEffect(() => {
    refetch();
  }, [search, sortField, sortOrder, categoryArray, itemsPerPage]);

  useEffect(() => {
    const filterActive =
      search !== '' ||
      sortField !== '' ||
      sortOrder !== '' ||
      selectedCategory !== '';
    setIsFilterActive(filterActive);
  }, [search, sortField, sortOrder, selectedCategory]);

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setsearch('');
    setSortField('');
    setSortOrder('');
    setSelectedCategory('');
  };
  const handleSort = (field) => {
    searchParams.set('sortfield', field);
    searchParams.set('sortorder', sortOrder === 'asc' ? 'desc' : 'asc');
    setSearchParams(searchParams);
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    searchParams.set('category', category);
    setSearchParams(searchParams);
  };

  const handleNewToursModal = () => {
    setNewToursModalOpen(true);
  };

  const handleUpdateTourModal = (id) => {
    searchParams.set('id', id);
    setSearchParams(searchParams);
    setUpdateTourModalOpen(true);
  };

  return (
    isLoading || (
      <div className="text-center bg-lime-100 dark:bg-gray-500 dark:text-gray-300 p-4">
        <h1 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-7xl mt-8 mb-10 italic font-bold">
          Kirándulások
        </h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 md:w-1/2">
            <input
              type="search"
              id="default-search"
              className="w-full border-2 border-lime-400 rounded-lg p-2 text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl"
              placeholder="Keresés..."
              onChange={(e) => {
                searchParams.set('search', e.target.value);
                setSearchParams(searchParams);
                setsearch(e.target.value);
              }}
            />
          </div>
          <div className="flex-1 md:w-1/4">
            <Select
              id="categories"
              value={selectedCategory}
              className=" w-1/3  text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl lg:w-fitt"
              onChange={handleCategoryChange}
            >
              <option
                value=""
                className="text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl"
              >
                Kategóriák
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>

          {isFilterActive && (
            <button
              type="submit"
              className="bg-black text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl text-lime-400 font-bold py-2 px-4 rounded-lg lg:w-25"
              onClick={clearFilters}
            >
              Szűrés törlése
            </button>
          )}
          <button
            type="button"
            className=" bg-lime-500 text-black font-bold py-2 px-4 rounded-lg dark:bg-gray-800 dark:text-lime-400"
            onClick={handleNewToursModal}
          >
            Új kirándulás hozzáadása
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  className="px-4 md:px-6 py-3 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Kirándulás neve <FaSort />
                </th>
                <th
                  className="hidden md:table-cell px-4 md:px-6 py-3 cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  Dátum <FaSort />
                </th>
                <th
                  className="hidden md:table-cell px-4 md:px-6 py-3 cursor-pointer"
                  onClick={() => handleSort('address')}
                >
                  Helyszín <FaSort />
                </th>
                <th
                  className="hidden md:table-cell px-4 md:px-6 py-3 cursor-pointer"
                  onClick={() => handleSort('categories')}
                >
                  Kategória <FaSort />
                </th>
                <th
                  className="hidden md:table-cell px-4 md:px-6 py-3 cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  Férőhelyek száma <FaSort />
                </th>
                <th
                  className="hidden md:table-cell px-4 md:px-7 py-3 cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  Ár <FaSort />
                </th>
                <th className="px-4 md:px-6 py-3">
                  <span className="sr-only">Módosítás</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tours
                ?.filter(({ categories: toursCategories }) =>
                  selectedCategory
                    ? toursCategories.includes(selectedCategory)
                    : true
                )
                .map(
                  ({
                    id,
                    name,
                    address,
                    price,
                    amount,
                    date,
                    categories: toursCategories,
                  }) => (
                    <tr
                      key={id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-lime-400"
                      >
                        {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                      </th>
                      <td className="px-6 py-4 hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                        {date}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                        {address}
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                        {toursCategories}
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                        {amount} db
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                        {price} Ft
                      </td>
                      <td className="px-6 py-4 text-center  ">
                        <div className="md:flex lg:flex xl:flex 2xl:flex justify-center gap-4">
                          {deleteTourId === id && (
                            <DeleteAlert
                              deleteModal={deleteModal}
                              setDeleteModal={setDeleteModal}
                              name={name}
                              id={id}
                              deleteItem={deleteTour}
                              onClose={() => setDeleteTourId(null)}
                            />
                          )}
                          <button
                            type="button"
                            className="font-medium bg-black text-lime-400 text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-lg dark:bg-gray-900 dark:text-lime-400"
                            onClick={() => handleDeleteClick(id)}
                          >
                            Törlés
                          </button>
                          <button
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => handleUpdateTourModal(id)}
                          >
                            Módosítás
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300  dark:text-lime-400 dark:hover:text-gray-400  focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            type="button"
            onClick={() => setItemsPerPage(itemsPerPage + 2)}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
              Tovább...
            </span>
          </button>
        </div>
        <CreateTours
          toursModal={newToursModalOpen}
          setToursModal={setNewToursModalOpen}
        />
        <UpdateTour
          updateTourModal={updateTourModalOpen}
          setUpdateTourModal={setUpdateTourModalOpen}
        />
      </div>
    )
  );
}
