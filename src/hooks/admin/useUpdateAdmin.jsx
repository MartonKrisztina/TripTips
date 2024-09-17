import { useMutation, useQueryClient } from 'react-query';
import Update from '../../services/Update';

export default function useUpdateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async ({ id, data }) => {
      const user = await Update('users', id, data);
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getUser');
    },
  });
}
