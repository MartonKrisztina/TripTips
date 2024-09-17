import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider';

export default function Guard({ children }) {
  const { user } = useContext(AuthContext);
  if (user) return children;
  return <Navigate to="/" />;
}
