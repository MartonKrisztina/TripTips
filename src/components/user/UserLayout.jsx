import { Outlet } from 'react-router-dom';
import Guard from '../../guard/Guard';

export default function UserLayout() {
  return (
    <Guard>
      <Outlet />
    </Guard>
  );
}
