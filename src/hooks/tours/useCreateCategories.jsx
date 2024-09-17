import { useMutation, useQueryClient } from 'react-query';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { notifySuccess, notifyError } from '../../utils/toast';


export default function useCreateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (item) => {
      try {
        const docRef = await addDoc(collection(db, 'categories'), item);
        notifySuccess('A kategória sikeresen hozzáadva!');

        return docRef.id;
      } catch (error) {
        notifyError('Hiba történt a kategória hozzáadása közben!');
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
