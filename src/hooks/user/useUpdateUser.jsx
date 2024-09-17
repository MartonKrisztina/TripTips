import { useMutation, useQueryClient } from 'react-query';
import Update from '../../services/Update';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async ({ id, data }) => {
      try {
        const user = await Update('users', id, data);
        notifySuccess('Sikeresen módosítottad a profilod!');
        return user;
      } catch (error) {
        notifyError('Hiba történt a profil frissítése közben!');
        return { error };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getUser');
    },
  });
}
