import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init';

const getUserByUid = async (uid) => {
  const q = query(collection(db, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let userData;
  querySnapshot.forEach((doc) => {
    userData = { id: doc.id, ...doc.data() };
  });
  return userData;
};

export default getUserByUid;
