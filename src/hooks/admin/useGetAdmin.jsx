import { useQuery } from 'react-query';
import ReadById from '../../services/ReadbyId';

export default function useGetAdmin(id = 'Ek5PlboZymaP5sJAkcj1') {
  return useQuery({
    queryKey: ['getAdmin'],
    queryFn: async () => {
      const admin = await ReadById('admins', id);
      return admin;
    },
  });
}
