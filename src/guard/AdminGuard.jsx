import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider';
import Loading from '../utils/Loading';

export default function AdminGuard({ children }) {
  const { currentDbUser, loading } = useContext(AuthContext);
  if (loading) return <Loading />;
  if (!currentDbUser) return null;
  if (currentDbUser.isAdmin) return children;
  return <Navigate to="/" />;
}
