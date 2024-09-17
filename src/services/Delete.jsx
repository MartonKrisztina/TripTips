import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/init';

export default async function Delete(yourCollectionName, id) {
  await deleteDoc(doc(db, yourCollectionName, id));
}
