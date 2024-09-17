import { useEffect } from 'react';
import useGetUserReservations from '../../../hooks/reservation/useGetUserReservations';

export default function UserReservations() {
  const {
    data: reservations,
    refetch,
    isLoading,
    error,
  } = useGetUserReservations();

  useEffect(() => {
    refetch();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading reservations.</div>;
  }

  return (
    isLoading || (
      <div>
        <div className="text-center w-200">
          <h1 className="text-3xl md:text-4xl lg:text-4xl  xl:text-5xl 2xl:text-5xl italic font-bold mb-4 dark:text-gray-400">
            Saját foglalásaim
          </h1>

          <div className="items-center space-y-8 bg-lime-400 bg-opacity-25 rounded-xl mt-4 dark:bg-gray-400">
            <table>
              <thead>
                <tr className="h-12">
                  <th className="w-40 hidden md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                    ID
                  </th>
                  <th className="w-44 md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                    Létrehozta
                  </th>

                  <th className="w-88 hidden md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                    Kirándulás neve
                  </th>
                  <th className="w-44  md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                    Bruttó összeg
                  </th>
                  <th className="w-28 hidden text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                    Dátum
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr
                    className="border-b-2 border-black h-16 "
                    key={reservation.id}
                  >
                    <td className="hidden md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                      {reservation.id}
                    </td>
                    <td className=" md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                      {reservation.user.name}
                    </td>
                    <td className="hidden md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                      {Object.keys(reservation.reservations).map(
                        (reservationKey, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <div key={index}>
                            {reservation.reservations[reservationKey].name}
                          </div>
                        )
                      )}
                    </td>
                    <td>
                      <span
                        className="text-lime-600 dark:text-lime-500  md:table-cell text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl"
                        style={{ fontWeight: 'bold' }}
                      >
                        {reservation.total} Ft
                      </span>
                    </td>
                    <td>{formatDate(reservation.user.orderDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
}
