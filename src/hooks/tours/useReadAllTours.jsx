import { useQuery } from 'react-query';
import {
  getDocs,
  collection,
  query,
  orderBy,
  where,
  limit,
} from 'firebase/firestore';
import { db } from '../../firebase/init';

export default function useReadAllTours(
  searchInput = null,
  sortField = null,
  sortOrder = null,
  categoryFilter = null,
  itemsPerPage = null
) {
  return useQuery({
    queryKey: ['getTours'],
    queryFn: async () => {
      let q = collection(db, 'tours');

      if (searchInput) {
        const endInput = searchInput.replace(/.$/, (end) =>
          String.fromCharCode(end.charCodeAt(0) + 1)
        );

        q = query(
          q,
          where('name', '>=', searchInput),
          where('name', '<', endInput)
        );
      }

      if (sortField && sortOrder) {
        q = query(q, orderBy(sortField, sortOrder));
      }
      if (categoryFilter && categoryFilter.length > 0) {
        q = query(q, where('name', 'in', categoryFilter));
      }
      if (itemsPerPage) {
        q = query(q, limit(itemsPerPage));
      }

      const querySnapshot = await getDocs(q);

      const data = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return data;
    },
  });
}
