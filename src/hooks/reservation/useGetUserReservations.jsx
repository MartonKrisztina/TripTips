import { useQuery } from 'react-query';
import { useContext } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/init';
import AuthContext from '../../contexts/AuthProvider';

export default function useGetUserReservations() {
  const { currentDbUser } = useContext(AuthContext);

  return useQuery(
    ['getUserReservations', currentDbUser?.uid],
    async () => {
      if (!currentDbUser?.uid) {
        return [];
      }

      const reservationsRef = collection(db, 'reservations');
      const q = query(
        reservationsRef,
        where('user.id', '==', currentDbUser.uid)
      );
      const querySnapshot = await getDocs(q);

      const reservations = [];
      querySnapshot.forEach((doc) => {
        reservations.push({ id: doc.id, ...doc.data() });
      });

      return reservations;
    },
    {
      enabled: !!currentDbUser?.uid,
    }
  );
}
