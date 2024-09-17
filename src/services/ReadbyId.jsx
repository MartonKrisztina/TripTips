import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/init';

export default async function ReadById(yourCollectionName, id) {
  const item = await getDoc(doc(db, yourCollectionName, id));
  return item.data();
}
