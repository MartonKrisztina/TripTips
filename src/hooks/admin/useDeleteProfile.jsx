import { useMutation, useQueryClient } from 'react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useDeleteProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteProfile'],
    mutationFn: async (id) => {
      try {
        await deleteDoc(doc(db, 'users', id));
        notifySuccess('A profil sikeresen törölve!');
        return id;
      } catch (error) {
        notifyError('Hiba történt a profil törlése közben!');
        return { error };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getProfils');
    },
  });
}
