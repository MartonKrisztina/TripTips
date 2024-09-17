import { collection, query, where, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../../firebase/init';

export default function useGetReservationById(id) {
  return useQuery({
    queryKey: ['getReservation'],
    queryFn: async () => {
      const q = query(collection(db, 'users'), where('uid', '==', id));
      const querySnapshot = await getDocs(q);
      let reservations;
      querySnapshot.forEach((doc) => {
        reservations = { id: doc.id, ...doc.data() };
      });
      return reservations;
    },
  });
}
