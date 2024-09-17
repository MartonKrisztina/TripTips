import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 8000);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-2 text-center">
      <h1>404 Error</h1>
      <h1>Page not found</h1>
      <Link
        to="/"
        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
