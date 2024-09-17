import { Link } from 'react-router-dom';
import { MdOutlineCategory } from 'react-icons/md';
import { BiSolidFoodMenu } from 'react-icons/bi';
import {
  LiaAddressBook,
  LiaHikingSolid,
  LiaUserFriendsSolid,
} from 'react-icons/lia';
import { TbBrandBooking } from 'react-icons/tb';
import { TiMessages } from 'react-icons/ti';
import { useState } from 'react';

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-700 flex-col text-center">
      <div className="max-w-full flex flex-wrap items-center justify-center p-4">
        <div
          className=" w-full hidden lg:flex md:w-auto md:items-center"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-700 md:dark:bg-gray-700 dark:border-gray-700">
            <li>
              <Link
                to="/admin/tours"
                className="flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-lime-400 md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <LiaHikingSolid size={25} /> Kirándulások
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className="flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-lime-400 md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <MdOutlineCategory size={25} /> Kategóriák
              </Link>
            </li>
            <li>
              <Link
                to="/admin/profile"
                className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-lime-400 md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <LiaAddressBook size={25} />
                Személyes adatok
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reservations"
                className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-lime-400 md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <TbBrandBooking size={25} /> Foglalás
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-lime-400 md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <LiaUserFriendsSolid size={25} /> Felhasználók
              </Link>
            </li>
            <li>
              <Link
                to="/admin/messages"
                className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-lime-400 md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <TiMessages size={25} /> Üzenetek
              </Link>
            </li>
          </ul>
        </div>
        <BiSolidFoodMenu
          className="taple-cell sticky top-0 lg:hidden cursor-pointer text-6xl"
          onClick={handleOpenMenu}
        />
        {isMenuOpen && (
          <div
            className=" w-full  lg:flex md:w-auto md:items-center"
            id="navbar-default"
          >
            <ul className="font-base flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/admin/tours"
                  className="flex gap-2 text-base text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <LiaHikingSolid size={25} /> Kirándulások
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories"
                  className="flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <MdOutlineCategory size={25} /> Kategóriák
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/profile"
                  className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <LiaAddressBook size={25} />
                  Személyes adatok
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reservations"
                  className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <TbBrandBooking size={25} /> Foglalás
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <LiaUserFriendsSolid size={25} /> Felhasználók
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/messages"
                  className=" flex gap-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <TiMessages size={25} /> Üzenetek
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
