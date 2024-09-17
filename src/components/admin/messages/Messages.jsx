import { BsCheck2, BsX } from 'react-icons/bs';
import { useEffect } from 'react';
import useGetAllMessages from '../../../hooks/contact/useGetAllMessages';
import useUpdateAnswear from '../../../hooks/contact/useUpdateAnswear';

export default function Messages() {
  const { data: users, refetch, isLoading } = useGetAllMessages();
  const updateAnswerMutation = useUpdateAnswear();

  useEffect(() => {
    refetch();
  }, []);

  const markAsAnswered = (id, answered) => {
    updateAnswerMutation.mutate({ id, data: { answered } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    isLoading || (
      <div className="min-h-screen py-8 md:py-0">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center dark:text-gray-300">
            Üzenetek
          </h1>
          <div className="overflow-x-auto bg-lime-100 dark:bg-gray-500 dark:text-gray-200">
            <table className="w-full">
              <thead>
                <tr className="h-12 bg-black text-lime-400 dark:bg-gray-800">
                  <th className="hidden md:table-cell w-1/7 md:w-1/7 lg:w-1/7 cursor-pointer text-lg md:text-lg lg:text-lg md:leading-loose lg:leading-loose">
                    ID
                  </th>
                  <th className="w-1/5 md:w-1/7 lg:w-1/7 cursor-pointer text-lg md:text-lg lg:text-lg md:leading-loose lg:leading-loose">
                    Név
                  </th>
                  <th className="w-1/5 md:w-1/7 lg:w-1/7 text-lg md:text-lg lg:text-lg">
                    Email
                  </th>
                  <th className="hidden md:table-cell w-1/5 md:w-1/7 lg:w-1/7 text-lg md:text-lg lg:text-lg">
                    Telefonszám
                  </th>
                  <th className="w-1/5 md:w-1/7 lg:w-1/7 text-lg md:text-lg lg:text-lg">
                    Üzenet
                  </th>
                  <th className="w-1/5 md:w-1/7 lg:w-1/7 text-lg md:text-lg lg:text-lg">
                    Válaszolt
                  </th>
                  <th className="w-1/5 md:w-1/7 lg:w-2/7 cursor-pointer text-lg md:text-lg lg:text-lg md:leading-loose lg:leading-loose">
                    Dátum
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-b border-black" key={user.id}>
                    <td className="hidden md:table-cell text-lg md:text-lg lg:text-lg md:leading-loose lg:leading-loose">
                      {user.id}
                    </td>
                    <td className="break-all text-lg md:text-lg lg:text-lg md:leading-loose lg:leading-loose">
                      {user.name}
                    </td>
                    <td className="break-all text-lg md:text-lg lg:text-lg">
                      {user.email}
                    </td>
                    <td className="hidden md:table-cell break-all text-lg md:text-lg lg:text-lg">
                      {user.phonenumber}
                    </td>
                    <td className="break-all text-lg md:text-lg lg:text-lg">
                      {user.message}
                    </td>
                    <td className="text-lg lg:text-lg md:text-lg lg:leading-loose">
                      {user.answered ? (
                        <BsCheck2
                          className="text-green-500 cursor-pointer text-6xl"
                          onClick={() => markAsAnswered(user.id, false)}
                        />
                      ) : (
                        <BsX
                          className="text-red-500 cursor-pointer text-6xl"
                          onClick={() => markAsAnswered(user.id, true)}
                        />
                      )}
                    </td>
                    <td className="text-lg md:text-lg lg:text-lg md:leading-loose lg:leading-loose">
                      {formatDate(user.date)}
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
