import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useGetCart from '../../hooks/cart/useGetCart';
import generateUniqueId from '../../utils/UniqueId';
import useUpdateCart from '../../hooks/cart/useUpdateCart';

export default function Cart() {
  const { data, refetch } = useGetCart();
  const { mutate } = useUpdateCart();
  useEffect(() => {
    refetch();
  }, []);
  return data?.reservations.length !== 0 ? (
    <section className="relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black dark:text-gray-400">
          Kosár
        </h2>
        {data?.reservations.map((item, idx) => (
          <React.Fragment key={generateUniqueId()}>
            <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8">
              <div className="col-span-12 w-full">
                <div className="flex items-center justify-between w-full mb-4">
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900 dark:text-gray-400">
                    {item.name}
                  </h5>
                  <button
                    type="button"
                    aria-label={`Törlés: ${item.name}`}
                    className="rounded-full flex items-center justify-center"
                    onClick={() => {
                      mutate({ data: data?.reservations, idx });
                    }}
                  >
                    <FaTrash className="text-lime-500 text-2xl" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-lime-600 font-manrope font-bold text-2xl leading-9 text-right dark:text-gray-200">
                    {item.price} Ft
                  </h6>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4 dark:text-gray-200">
            Összesen fizetendő
          </h5>

          <div className="flex items-center justify-between gap-5 ">
            <h6 className="font-manrope text-nowrap font-bold text-3xl lead-10 text-lime-600">
              {data?.reservations.reduce(
                (totalPrice, reservation) =>
                  totalPrice + Number(reservation.price),
                0
              ) || 0}{' '}
              Ft
            </h6>
          </div>
        </div>
        <div className="max-lg:max-w-lg max-lg:mx-auto mt-10 ml-2">
          <Link
            to="/reservation"
            className="rounded-full py-4 px-6 bg-lime-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-lime-700 dark:bg-gray-800 dark:text-lime-400"
          >
            Megadom az adataim
          </Link>
        </div>
      </div>
    </section>
  ) : (
    <section className="h-screen flex items-center justify-center">
      <div className="w-full h-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          A kosarad üres
        </h2>
      </div>
    </section>
  );
}
