import { useMutation, useQueryClient } from 'react-query';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useCreateMessage() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (item) => {
      try {
        const docRef = await addDoc(collection(db, 'messages'), item);
        return docRef.id;
      } catch (error) {
        throw new Error('Az üzenet elküldése sikertelen!');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        notifySuccess('Az üzenet sikeresen elküldve!');
      },
      onError: (error) => {
        notifyError(error.message);
      },
    }
  );

  return mutation;
}
