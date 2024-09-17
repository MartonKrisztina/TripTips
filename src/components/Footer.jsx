import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { AiFillEnvironment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FacebookIcon from './icons/FacebookIcon';
import DiscordIcon from './icons/DiscordIcon';
import TwitterIcon from './icons/TwitterIcon';
import GithubIcon from './icons/GithubIcon';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4 py-8 lg:py-8">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Felfedezés
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="/tours-tips" className="hover:underline">
                  Túratippek
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/tours/gallery" className="hover:underline">
                  Galléria
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/about" className="hover:underline">
                  Rólunk
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Szolgáltatások
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <span className="hover:underline">Utazás tervezés</span>
              </li>
              <li className="mb-4">
                <span className="hover:underline">Utazás előkészítése</span>
              </li>
              <li className="mb-4">
                <a href="#subscribing" className="hover:underline">
                  Hírlevél feliratkozás
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Csomagok
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <span className="hover:underline">Legnépszerűbb utazások</span>
              </li>
              <li className="mb-4">
                <span className="hover:underline">First minute utazás</span>
              </li>
              <li className="mb-4">
                <span className="hover:underline">Last minute utazás</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Hasznos információ
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <span className="hover:underline">Á.SZ.F</span>
              </li>
              <li className="mb-4">
                <span className="hover:underline">Hasznos dokumentumok</span>
              </li>
              <li className="mb-4">
                <span className="hover:underline">
                  Hasznos dokumentumok utazás előtt
                </span>
              </li>
              <li className="mb-4">
                <span className="hover:underline">Utazási szabályzat</span>
              </li>
              <li className="mb-4">
                <span className="hover:underline">GYIK</span>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-6 text-lg font-semibold text-gray-900 uppercase dark:text-white">
              Kapcsolat
            </h1>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4 flex items-center">
                {' '}
                <FaPhone className="w-4 h-4 mr-2 text-gray-400" />{' '}
                <p>+123 456 789</p>{' '}
              </li>
              <li className="mb-4">
                <p className="flex ">
                  <AiFillEnvironment className="mr-2 w-9 h-9" />
                  1036 Budapest, Bécsi út 53-55.,I. emelet
                </p>
              </li>
              <li className="mb-4 flex items-center">
                <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
                <p>triptips@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center block mb-4 md:mb-0">
            © 2024 Progmatic™
          </span>
          <div className="flex justify-center sm:justify-end space-x-5 rtl:space-x-reverse">
            <FacebookIcon />
            <DiscordIcon />
            <TwitterIcon />
            <GithubIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
