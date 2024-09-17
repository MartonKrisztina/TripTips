import { Dropdown } from 'flowbite-react';
import { FaCartArrowDown, FaTrashAlt } from 'react-icons/fa';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetCart from '../../hooks/cart/useGetCart';
import useUpdateCart from '../../hooks/cart/useUpdateCart';
import generateUniqueId from '../../utils/UniqueId';
import shortenText from '../../utils/shortenText';
import AuthContext from '../../contexts/AuthProvider';

export default function CartIcon() {
  const { data, refetch } = useGetCart();
  const { currentDbUser } = useContext(AuthContext);
  const { mutate } = useUpdateCart();
  useEffect(() => {
    refetch();
  }, [data, currentDbUser]);
  return (
    <Dropdown
      inline
      label={
        <div className="h-fit flex justify-center items-center">
          <div className="relative py-2">
            <div className="top-0 absolute left-3">
              <p className="flex h-2 w-2 items-center justify-center rounded-full bg-lime-600 p-3 text-xs text-white">
                {data?.reservations.length || 0}
              </p>
            </div>
            <FaCartArrowDown className="text-2xl" />
          </div>
        </div>
      }
    >
      {data?.reservations.map((item, idx) => (
        <React.Fragment key={generateUniqueId()}>
          <div className="w-80 flex justify-between gap-3 p-3">
            <span className="">{shortenText(item.name, 20)}</span>
            <span className="text-nowrap">{item.price} Ft</span>
            <button
              type="button"
              aria-label={`Törlés: ${item.name}`}
              onClick={() => {
                mutate({ data: data?.reservations, idx });
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </React.Fragment>
      ))}
      <Dropdown.Divider />
      <div className="flex items-center justify-center p-3">
        {!data?.reservations.length
          ? 'A kosarad üres'
          : data?.reservations.reduce(
              (totalPrice, reservation) =>
                totalPrice + Number(reservation.price),
              0
            ) || 0}
        {' Ft'}
      </div>
      <Dropdown.Divider />
      <Dropdown.Item className="flex items-center justify-center">
        <Link to="/cart">Irány a kosár</Link>
      </Dropdown.Item>
    </Dropdown>
  );
}
