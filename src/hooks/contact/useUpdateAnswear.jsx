import { useMutation, useQueryClient } from 'react-query';
import Update from '../../services/Update';

export default function useUpdateAnswear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateAnswar'],
    mutationFn: async ({ id, data }) => {
      const answear = await Update('messages', id, data);
      return answear;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getMessages');
    },
  });
}
