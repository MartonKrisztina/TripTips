import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/init';

export default async function DeleteImage(filePath) {
  const storageRef = ref(storage, filePath);
  await deleteObject(storageRef);
}
