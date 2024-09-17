import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import useReadCategories from '../../../hooks/tours/useReadCategories';
import useDeleteCategory from '../../../hooks/tours/useDeleteCategory';
import CreateCategories from './CreateCategories';
import UpdateCategory from './UpdateCategory';
import DeleteAlert from '../../DeleteAlert';

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get('itemsPerPage')) || 4
  );
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [updateCategoryModalOpen, setUpdateCategoryModalOpen] = useState(false);
  const [sortField, setSortField] = useState(
    searchParams.get('sortField') || ''
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || ''
  );
  const {
    data: categories,
    refetch,
    isLoading,
  } = useReadCategories(sortField, sortOrder, itemsPerPage);
  const { mutate: deleteCategory } = useDeleteCategory();
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const handleDeleteClick = (id) => {
    setDeleteCategoryId(id);
    setDeleteModal(true);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSortField('');
    setSortOrder('');
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSearchParams({
      sortField: field,
      sortOrder: newSortOrder,
      itemsPerPage,
    });
    setSortField(field);
    setSortOrder(newSortOrder);
  };
  const handleNewCategoryModal = () => {
    setNewCategoryModalOpen(true);
  };
  const handleUpdateCategoryModal = (id) => {
    searchParams.set('id', id);
    setSearchParams(searchParams);
    setUpdateCategoryModalOpen(true);
  };
  useEffect(() => {
    refetch();
  }, [sortField, sortOrder, itemsPerPage]);

  useEffect(() => {
    const filterActive = sortField !== '' || sortOrder !== '';
    setIsFilterActive(filterActive);
  }, [sortField, sortOrder]);

  return (
    isLoading || (
      <div className="text-center bg-lime-100 dark:bg-gray-500 dark:text-gray-300 p-4 sm:p-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic font-bold mt-4 mb-6">
          Kategóriák
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            className="bg-lime-500 text-black font-bold py-2 px-4 rounded-lg dark:bg-gray-800 dark:text-lime-400"
            onClick={handleNewCategoryModal}
          >
            Új kategória hozzáadása
          </button>
          {isFilterActive && (
            <button
              type="submit"
              className="bg-black text-lime-400 text-sm md:text-base font-bold py-2 px-4 rounded-lg"
              onClick={clearFilters}
            >
              Szűrés törlése
            </button>
          )}
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm sm:text-base mb-4 text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Kategória neve
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="hidden lg:table-cell px-6 py-3 cursor-pointer"
                  onClick={() => handleSort('tools')}
                >
                  <div className="flex items-center">
                    Szükséges eszközök <FaSort className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Módosítás</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map(({ id, name, tools }) => (
                <tr
                  key={id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-lime-400">
                    {name}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 text-sm">
                    {tools}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {deleteCategoryId === id && (
                      <DeleteAlert
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                        name={name}
                        id={id}
                        deleteItem={deleteCategory}
                        onClose={() => setDeleteCategoryId(null)}
                      />
                    )}
                    <button
                      type="button"
                      className="font-medium bg-black text-lime-400 text-sm px-4 py-2 rounded-lg mr-2 mb-2 dark:bg-gray-900 dark:text-lime-400"
                      onClick={() => handleDeleteClick(id)}
                    >
                      Törlés
                    </button>
                    <button
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => handleUpdateCategoryModal(id)}
                    >
                      Módosítás
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            type="button"
            onClick={() => setItemsPerPage(itemsPerPage + 2)}
          >
            <span className="relative px-5 py-2.5 text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Tovább...
            </span>
          </button>
        </div>
        <CreateCategories
          modal={newCategoryModalOpen}
          setModal={setNewCategoryModalOpen}
        />
        <UpdateCategory
          updateModal={updateCategoryModalOpen}
          setUpdateModal={setUpdateCategoryModalOpen}
        />
      </div>
    )
  );
}
