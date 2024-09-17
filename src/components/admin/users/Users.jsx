import { BsCheck2, BsX } from 'react-icons/bs';
import { useEffect } from 'react';
import useGetAllUsers from '../../../hooks/user/useGetAllUsers';
import useUpdateIsAdmin from '../../../hooks/admin/useUpdateIsAdmin';

export default function Users() {
  const { data: users, refetch, isLoading } = useGetAllUsers();
  const updateUserMutation = useUpdateIsAdmin();

  useEffect(() => {
    refetch();
  }, []);

  const toggleAdminStatus = async (userId, isAdmin) => {
    const updatedUserData = { isAdmin: !isAdmin };
    await updateUserMutation.mutateAsync({
      id: userId,
      data: updatedUserData,
    });
    refetch();
  };

  return (
    isLoading || (
      <div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Felhasználók</h1>
          <div className="flex flex-col justify-center items-center space-y-8 bg-lime-400 bg-opacity-25 rounded-xl mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="h-12 bg-black text-lime-400">
                  <th className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                    ID
                  </th>
                  <th className="w-2/6 sm:w-2/12">Név</th>
                  <th className=" hidden lg:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                    Email
                  </th>
                  <th className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base w-1/6">
                    Város
                  </th>
                  <th className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base w-1/6">
                    Cím
                  </th>
                  <th className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base w-1/6">
                    Telefon
                  </th>
                  <th className="w-1/6 sm:w-1/12">Feliratkozás</th>
                  <th className="w-1/6 sm:w-1/12">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-b-2 border-black" key={user.id}>
                    <td className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                      {user.id}
                    </td>
                    <td className="w-2/6 sm:w-2/12">{user.name}</td>
                    <td className=" hidden lg:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                      {user.email}
                    </td>
                    <td className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base w-1/6">
                      {user.city}
                    </td>
                    <td className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-basew-1/6">
                      {user.address}
                    </td>
                    <td className=" hidden xl:table-cell text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base w-1/6">
                      {user.phone}
                    </td>
                    <td className="w-1/6 sm:w-1/12">
                      {user.subscribe ? (
                        <BsCheck2 className="text-lime-400 text-6xl" />
                      ) : (
                        <BsX className="text-red-400 text-6xl" />
                      )}
                    </td>
                    <td className="w-1/6 sm:w-1/12">
                      <button
                        type="button"
                        onClick={() => toggleAdminStatus(user.id, user.isAdmin)}
                        className={`font-bold py-1 px-2 rounded-lg mr-2 ${
                          user.isAdmin
                            ? 'bg-lime-400 text-black'
                            : 'bg-red-400 text-white'
                        }`}
                      >
                        {user.isAdmin ? 'Admin' : 'Nem admin'}
                      </button>
                    </td>
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
