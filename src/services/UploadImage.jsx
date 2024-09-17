import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/init';

export default async function UploadImage(file, filePath) {
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
