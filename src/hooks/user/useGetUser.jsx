import { useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../../contexts/AuthProvider';
import getUserByUid from '../../services/ReadByUID';

export default function useGetUser() {
  const { currentDbUser } = useContext(AuthContext);
  return useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      if (!currentDbUser) return null;
      const user = await getUserByUid(currentDbUser?.uid);
      return user;
    },
  });
}
