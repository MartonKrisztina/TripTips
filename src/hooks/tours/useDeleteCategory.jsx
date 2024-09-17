import { useMutation, useQueryClient } from 'react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: async (id) => {
      try {
        await deleteDoc(doc(db, 'categories', id));
        notifySuccess('A kategória sikeresen törölve!');
      } catch (error) {
        notifyError('Hiba történt a kategória törlése közben!');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCategories');
    },
  });
}
