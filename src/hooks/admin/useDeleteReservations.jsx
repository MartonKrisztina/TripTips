import { useMutation, useQueryClient } from 'react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/init';

export default function useDeleteReservations() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteReservation'],
    mutationFn: async (id) => {
      await deleteDoc(doc(db, 'reservation', id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getReservation');
    },
  });
}
