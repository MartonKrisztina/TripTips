import { useQuery } from 'react-query';
import ReadById from '../../services/ReadbyId';

export default function useGetCategoryById(id) {
  return useQuery({
    queryKey: ['getCategory'],
    queryFn: async () => {
      if (id !== '') {
        const category = await ReadById('categories', id);
        return category;
      }
      return null;
    },
  });
}
