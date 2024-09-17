import { useQuery } from 'react-query';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/init';

export default function useReadCategories(
  sortField = null,
  sortOrder = null,
  itemsPerPage = 4
) {
  return useQuery({
    queryKey: ['getCategories', sortField, sortOrder],
    queryFn: async () => {
      let q = collection(db, 'categories');

      if (sortField && sortOrder) {
        q = query(q, orderBy(sortField, sortOrder));
      }

      if (itemsPerPage) {
        q = query(q, limit(itemsPerPage));
      }
      const querySnapshot = await getDocs(q);

      const categories = [];

      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });

      return categories;
    },
  });
}
