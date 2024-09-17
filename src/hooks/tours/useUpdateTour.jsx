import { useQueryClient, useMutation } from 'react-query';
import Update from '../../services/Update';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTour'],
    mutationFn: async ({ id, data }) => {
      try {
        const tour = await Update('tours', id, data);
        notifySuccess('A kirándulás sikeresen frissítve!');
        return tour;
      } catch (error) {
        notifyError('Hiba történt a kirándulás frissítése közben!');
        return { error };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getTours');
    },
  });
}
