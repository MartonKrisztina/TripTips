import { useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../../contexts/AuthProvider';
import getUserByUid from '../../services/ReadByUID';

export default function useGetDarkMode() {
  const { currentDbUser } = useContext(AuthContext);
  return useQuery({
    queryKey: ['getUserDarkMode'],
    queryFn: async () => {
      if (!currentDbUser) return false;
      const user = await getUserByUid(currentDbUser?.uid);
      return user?.isDarkMode ?? false;
    },
  });
}
