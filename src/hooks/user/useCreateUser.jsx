import { useMutation, useQueryClient } from 'react-query';
import Create from '../../services/Create';
import { notifySuccess, notifyError } from '../../utils/toast';

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: async (formData) => {
      try {
        const newUser = await Create('users', formData);
        notifySuccess('Sikeresen létrehoztad a profilod!');
        return newUser;
      } catch (error) {
        notifyError('Hiba történt a profil hozzáadása közben!');
        return { error };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getUsers');
    },
  });
}
