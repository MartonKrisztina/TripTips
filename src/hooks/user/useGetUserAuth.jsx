import { useQuery } from 'react-query';
import ReadById from '../../services/ReadbyId';

export default function useGetUserAuth(uid = null) {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      if (uid) {
        const user = await ReadById('users', uid);
        return user;
      }
      return null;
    },
  });
}
