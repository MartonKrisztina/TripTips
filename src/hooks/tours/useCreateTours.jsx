import { useMutation, useQueryClient } from 'react-query';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useCreateTours() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (item) => {
      try {
        const docRef = await addDoc(collection(db, 'tours'), item);
        notifySuccess('A kirándulás sikeresen hozzáadva!');
        return docRef.id;
      } catch (error) {
        notifyError('Hiba történt a kirándulás hozzáadása közben!');
        return { error };
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  return mutation;
}
