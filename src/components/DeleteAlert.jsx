import { HiInformationCircle } from 'react-icons/hi';
import { Alert, Modal } from 'flowbite-react';

export default function DeleteAlert({
  name,
  id,
  deleteItem,
  onClose,
  deleteModal,
  setDeleteModal,
}) {
  const handleNoClick = () => {
    setDeleteModal(false);
    onClose();
  };
  const handleYesClick = async () => {
    await deleteItem(id);
    setDeleteModal(false);
    onClose();
  };
  return (
    <Modal show={deleteModal} size="md" onClose={handleNoClick} popup>
      <Alert color="warning" icon={HiInformationCircle}>
        <span className="font-medium">Figyelmeztetés!</span> Biztosan törölni
        szeretné a(z) {name} elemet?
        <div className="flex justify-center ">
          <button
            type="button"
            className="rounded-lg border border-lime-500 bg-lime-500 px-3 py-1.5 text-center text-xs font-medium text-gray-900 hover:bg-lime-600 hover:text-white focus:ring-4 focus:ring-lime-500 dark:border-lime-500 dark:text-grey-800 dark:hover:text-white"
            onClick={handleNoClick}
          >
            Mégse
          </button>
          <button
            type="button"
            className="rounded-lg border border-black bg-black px-3 py-1.5 text-center text-xs font-medium text-lime-500 hover:bg-black hover:text-lime-500 focus:ring-4 focus:ring-black dark:border-black dark:text-lime-500 dark:hover:text-white"
            onClick={handleYesClick}
          >
            Törlés
          </button>
        </div>
      </Alert>
    </Modal>
  );
}
