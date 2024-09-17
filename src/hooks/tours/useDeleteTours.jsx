import { useMutation, useQueryClient } from 'react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteTour'],
    mutationFn: async (id) => {
      try {
        await deleteDoc(doc(db, 'tours', id));
        notifySuccess('A kirándulás sikeresen törölve!');
        return id;
      } catch (error) {
        notifyError('Hiba történt a kirándulás törlése közben!');
        return { error };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getTours');
    },
  });
}