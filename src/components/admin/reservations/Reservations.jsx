import { useEffect } from 'react';
import useGetAllReservations from '../../../hooks/admin/useGetAllReservations';

export default function Reservations() {
  const { data: reservations, refetch, isLoading } = useGetAllReservations();

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4 dark:text-gray-300">Foglalások</h1>
      <div className="flex flex-col justify-center items-center space-y-8 bg-lime-400 bg-opacity-25 rounded-xl mt-4 dark:bg-gray-500 dark:text-gray-200">
        <table className="w-full">
          <thead>
            <tr className="h-12 bg-black text-lime-400 dark:bg-gray-800">
              <th className="w-40 hidden md:table-cell">ID</th>
              <th className="w-44">Név</th>
              <th className="hidden md:table-cell w-32">Város</th>
              <th className="hidden md:table-cell w-80">Cím</th>
              <th className="w-56">Email</th>
              <th className="hidden md:table-cell w-56">Telefon</th>
              <th className="w-56">Bruttó összeg</th>
            </tr>
          </thead>
          <tbody>
            {reservations &&
              reservations.map((reservation) => (
                <tr
                  className="border-b-2 border-black h-16"
                  key={reservation.id}
                >
                  <td className="hidden md:table-cell">{reservation.id}</td>
                  <td>{reservation.user.name}</td>
                  <td className="hidden md:table-cell">
                    {reservation.user.city}
                  </td>
                  <td className="hidden md:table-cell">
                    {reservation.user.address}
                  </td>
                  <td>{reservation.user.email}</td>
                  <td className="hidden md:table-cell">
                    {reservation.user.phone}
                  </td>
                  <td>
                    <span
                      className="text-lime-600"
                      style={{ fontWeight: 'bold' }}
                    >
                      {reservation.total} Ft
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
