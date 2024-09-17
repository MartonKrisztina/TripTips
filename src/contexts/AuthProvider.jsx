import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useQueryClient } from 'react-query';
import { auth } from '../firebase/init';
import getUserByUid from '../services/ReadByUID';
import useCreateUser from '../hooks/user/useCreateUser';

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [currentDbUser, setCurrentDbUser] = useState(null);
  const { mutate: createUser } = useCreateUser();
  const [loading, setLoading] = useState(true);

  const register = async (formData) => {
    let firebaseData;
    try {
      firebaseData = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      localStorage.setItem('user', firebaseData.user.uid);
    } catch (error) {
      if (error.code === 'auth/invalid-email')
        return { error: 'Invalid email format' };
      if (error.code === 'auth/weak-password')
        return { error: 'Password is not strong enough' };
      if (error.code === 'auth/email-already-in-use')
        return { error: `Email already in use: "${formData.email}"` };
      return { error: 'Something went wrong during user registration' };
    }
    try {
      createUser({
        name: formData.name,
        birthday: formData.birthday,
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
        subscribe: formData.subscribe,
        uid: firebaseData.user.uid,
        isAdmin: false,
      });
    } catch (error) {
      return { error: 'Something went wrong during user registration' };
    }
    return { success: 'Signed up successfully' };
  };
  const login = async (formData) => {
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      localStorage.setItem('user', data.user.uid);
      queryClient.invalidateQueries('getCart');
      return { success: 'Successfully logged in' };
    } catch (error) {
      if (error.code === 'auth/invalid-email')
        return { error: 'Invalid email format' };
      return { error: 'Invalid email or password' };
    }
  };
  const logout = async () => {
    localStorage.removeItem('user');
    queryClient.invalidateQueries('getCart');
    await signOut(auth);
  };
  useEffect(() => {
    const unmount = onAuthStateChanged(auth, async (dbuser) => {
      setUser(dbuser);
      setLoading(false);
      if (!dbuser) return setCurrentDbUser(null);
      try {
        const dbUser = await getUserByUid(dbuser.uid);
        localStorage.setItem('user', dbuser.uid);
        setCurrentDbUser(dbUser);
      } catch (error) {
        alert('Something went wrong!');
      }
      return null;
    });
    queryClient.invalidateQueries('getCart');
    return unmount;
  }, []);
  const value = {
    register,
    login,
    logout,
    user,
    currentDbUser: user ? currentDbUser : null,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
