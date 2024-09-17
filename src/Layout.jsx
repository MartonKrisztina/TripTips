import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center dark:bg-gray-700">
        <div className="max-w-screen-lg w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
