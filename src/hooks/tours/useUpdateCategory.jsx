import { useQueryClient, useMutation } from 'react-query';
import Update from '../../services/Update';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: async ({ id, data }) => {
      try {
        const category = await Update('categories', id, data);
        notifySuccess('A kategória sikeresen frissítve!');
        return category;
      } catch (error) {
        notifyError('Hiba történt a kategória frissítése közben!');
        return { error };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getCategories');
    },
  });
}
