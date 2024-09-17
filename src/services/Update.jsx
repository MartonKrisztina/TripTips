import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/init';

export default async function Update(yourCollectionName, id, newData) {
  await updateDoc(doc(db, yourCollectionName, id), newData);
  return { id, ...newData };
}
