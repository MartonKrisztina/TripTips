import { useMutation, useQueryClient } from 'react-query';
import Update from '../../services/Update';

export default function useUpdateDarkMode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateDarkMode'],
    mutationFn: async ({ id, isDarkMode }) => {
      const updatedDarkMode = await Update('users', id, { isDarkMode });
      return updatedDarkMode;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getUsers');
    },
  });
}
