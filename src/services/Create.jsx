import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/init';

export default async function Create(yourCollectionName, item) {
  const docRef = await addDoc(collection(db, yourCollectionName), item);
  return docRef.id;
}
