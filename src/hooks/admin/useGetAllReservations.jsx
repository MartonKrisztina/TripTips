import { useQuery } from 'react-query';
import { getDocs, collection, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebase/init';

export default function useGetAllReservations(
  searchInput = '',
  sortField = '',
  sortOrder = ''
) {
  return useQuery(['getReservations', sortField, sortOrder], async () => {
    let q = collection(db, 'reservations');

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

    const querySnapshot = await getDocs(q);

    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  });
}
