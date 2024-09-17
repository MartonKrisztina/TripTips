import { getDocs, collection, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/init';

export default async function Read(
  yourCollectionName,
  orderByCb = null,
  whereCb = null
) {
  const querySnapshot = await getDocs(
    collection(db, yourCollectionName),
    orderByCb ? orderBy(orderByCb) : null,
    whereCb ? where(whereCb) : null
  );

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
}
