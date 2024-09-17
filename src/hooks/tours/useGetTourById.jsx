import { useQuery } from 'react-query';
import ReadById from '../../services/ReadbyId';

export default function useGetTourById(id) {
  return useQuery({
    queryKey: ['getTour'],
    queryFn: async () => {
      if (id !== '') {
        const tour = await ReadById('tours', id);
        return tour;
      }
      return null;
    },
  });
}
