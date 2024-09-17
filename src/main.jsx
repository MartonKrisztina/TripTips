import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './Layout';
import AdminLayout from './AdminLayout';
import UserLayout from './components/user/UserLayout';
import Home from './components/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import ToursTips from './components/tours/ToursTips';

import Admin from './components/admin/Admin';
import Categories from './components/admin/categories/Categories';
import Profile from './components/admin/profile/Profile';
import Reservations from './components/admin/reservations/Reservations';
import AdminTours from './components/admin/tours/Tours';
import Users from './components/admin/users/Users';
import Cart from './components/cart/Cart';
import UserProfile from './components/user/profile/UserProfile';
import UserReservations from './components/user/reservations/UserReservations';
import PageNotFound from './components/PageNotFound';
import ContextProvider from './contexts/ContextProvider';
import Reservation from './components/user/reservations/Reservation';
import UserShopTours from './components/user/UserShopTours';
import Messages from './components/admin/messages/Messages';

import Gallery from './components/tours/Gallery';

const router = createBrowserRouter([
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tours-tips',
        element: <ToursTips />,
      },
      {
        path: '/tours',
        element: <UserShopTours />,
      },

      {
        path: '/tours/:gallery',
        element: <Gallery />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/reservation',
        element: <Reservation />,
      },

      {
        path: '/',
        element: <AdminLayout />,
        children: [
          {
            path: '/admin',
            element: <Admin />,
          },
          {
            path: '/admin/categories',
            element: <Categories />,
          },
          {
            path: '/admin/profile',
            element: <Profile />,
          },
          {
            path: '/admin/reservations',
            element: <Reservations />,
          },
          {
            path: '/admin/tours',
            element: <AdminTours />,
          },
          {
            path: '/admin/users',
            element: <Users />,
          },
          {
            path: '/admin/messages',
            element: <Messages />,
          },
        ],
      },
      {
        path: '/user',
        element: <UserLayout />,
        children: [
          {
            path: '/user/profile',
            element: <UserProfile />,
          },
          {
            path: '/user/reservations',
            element: <UserReservations />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ContextProvider>
  </QueryClientProvider>
);
