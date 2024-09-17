import { Outlet } from 'react-router-dom';
import AdminHeader from './components/admin/AdminHeader';
import AdminGuard from './guard/AdminGuard';

export default function Layout() {
  return (
    <AdminGuard>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <AdminHeader className="max-w-full text-center" />
        <main className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <Outlet />
        </main>
      </div>
    </AdminGuard>
  );
}
