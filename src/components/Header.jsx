import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'flowbite-react';
import { HiMenu } from 'react-icons/hi';
import CartIcon from './cart/CartIcon';
import useReadCategories from '../hooks/tours/useReadCategories';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthContext from '../contexts/AuthProvider';
import DarkModeContext from '../contexts/DarkModeProvider';
import { notifySuccess } from '../utils/toast';
import switchoff from '../assets/lightswitch-off.png';
import switchon from '../assets/lightswitch-on.png';

export default function Header() {
  const { data: categories, refetch } = useReadCategories(null, null, null);
  const [option, setOption] = useState('login');
  const [openModal, setOpenModal] = useState(false);
  const { logout, currentDbUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    refetch();
  }, [categories]);

  return (
    <>
      <nav className="text-black dark:text-gray-200 dark:bg-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="w-28 flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              className="fill-lime-500"
              viewBox="0 0 835 501"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M533.5 195C508.365 191.791 488.305 183.59 446.5 162.5C469.341 145.147 495.57 139.841 551 144C574.439 150.194 576.479 157.465 577 171.5C572.783 189.759 564.11 195.511 533.5 195Z" />
              <path d="M563.5 197C557.54 196.748 554.263 197.746 548.5 201C552.719 205.855 555.296 207.974 560.5 210C567.038 211.8 568.906 210.673 570 206C570.184 200.924 568.837 198.91 563.5 197Z" />
              <path d="M554 214C540.248 200.542 529.981 198.902 509.5 201L531.5 230C536.644 236.359 539.555 239.891 548.5 241.5L556.5 236.5C560.304 227.877 561.046 222.995 554 214Z" />
              <path d="M501 201C481.045 184.809 469.003 178.102 446.5 169C456.064 176.969 460.804 181.788 465.5 192.5C474.914 213.988 478.694 226.151 483.5 248C489.626 259.559 493.702 265.227 504 271.5C511.527 273.087 515.777 273.078 523.5 268.5C528.277 263.027 530.837 259.616 533.5 248C525.478 222.18 518.022 212.431 501 201Z" />
              <path d="M543 251.5C542.071 246.104 541.008 243.583 536.5 241.5C535.397 244.898 534.971 247.923 534.5 255C536.073 257.991 537.105 258.024 539 257.5C541.98 256.569 542.608 255.009 543 251.5Z" />
              <path d="M498.405 285.355C495.594 281.074 493.989 278.629 493.5 274C495.779 273.016 496.973 273.104 499 274C503.836 275.336 505.954 276.894 508 282C509.579 285.006 508.064 285.818 506 287.5C502.756 288.827 501.138 288.39 498.5 285.5L498.405 285.355Z" />
              <path d="M491.5 283C487.955 269.826 484.485 263.05 477 251.5C476.203 262.957 475.746 269.379 470.5 280C469.051 286.054 469.151 289.447 470.5 295.5C472.386 300.027 474.129 301.141 478.5 300.5C484.516 300.076 486.855 298.906 489 295L491.5 283Z" />
              <path d="M467 220C464.069 203.429 460.756 194.376 449.5 179C450.365 190.888 450.734 197.591 450 210C444.23 235.759 439.684 249.822 425 273C421.279 280.393 419.549 284.78 418.5 294C418.16 299.209 419.65 301.763 426 305.5C433.472 307.524 437.703 308.471 446.5 304.5C457.024 297.68 462.412 291.838 469 269.5C470.564 250.16 470.894 239.32 467 220Z" />
              <path d="M477 139L455 149H454V145.5L484 114.5C495.357 106.173 501.866 101.557 518 95C529.363 90.4119 535.805 89.702 547.5 92C555.107 92.4993 557.53 94.3887 561 98.5C566.587 101.909 568.863 104.673 568 114.5C568.092 119.576 565.594 122.423 557.5 127.5C549.863 131.582 545.265 133.713 530 134L477 139Z" />
              <path d="M525.5 65C512.918 73.5294 507.605 79.1987 498.5 89.5L500.5 92C507.625 88.58 512.785 87.2637 527 87.5L547.5 84.5C552.797 81.2915 553.597 79.2809 553 75.5C551.898 71.434 550.291 69.1435 542.5 65C536.299 63.5833 532.815 62.8109 525.5 65Z" />
              <path d="M535 55C530.09 59.7272 526.405 61.5336 519 64L518 60.5L521 51.5L527 47C529.852 46.4267 531.398 46.3278 533.5 49C536.089 51.6153 535.875 52.8553 535 55Z" />
              <path d="M516.5 47C514.287 67.2595 512.291 71.0518 508.5 75.5C500.07 78.1226 495.789 77.8536 488.5 76C485.392 73.6084 484.634 72.0682 485 69C488.478 61.2368 489.013 56.4602 488.5 47.5C488.439 38.4809 486.621 34.0175 480.5 27C475.021 23.0533 471.116 22.6935 463.5 23.5C449.888 23.7902 443.657 26.3736 432.6 30.9584L432.5 31L437 89.5L439 156.5V202.5L433 236.5C430.592 247.307 428.885 253.401 423.5 264.5C418.866 275.201 415.907 279.88 410 286C405.274 290.205 402.316 292.464 395.5 296C385.355 298.472 379.661 298.543 369.5 297.5C355.122 293.33 349.638 289.293 340 282C330.705 273.009 326.461 267.535 319.5 257.5C308.7 237.916 307.194 229.921 303.5 215C300.387 198.595 301.483 191.004 303.5 177.5C304.785 169.105 305.855 164.714 309 158C312.937 150.223 315.78 147.026 321.5 142.5C329.713 138.354 334.309 137.529 342.5 137C352.055 137.683 355.611 138.972 361.5 141.5C369.146 148.158 371.806 151.744 375 158L381.5 180.5C392.599 175.155 397.807 171.323 406.5 164V43.5C380.941 58.059 366.331 67.732 340 86.5C333.445 90.1049 329.334 91.5591 321.5 93.5C314.44 94.3531 310.483 94.7728 303.5 92.5C298.155 91.6085 295.363 90.2351 291.5 83C289.826 79.0857 289.182 76.3779 289.5 69C291.94 55.7176 294.052 51.9089 298 46C303.992 38.8918 307.398 36.909 313.5 34.5H324.5C327.005 35.2608 327.348 35.9729 327 37.5C324.507 44.4994 323.069 47.7616 320.5 53.5C317.632 62.5584 316.942 67.858 316.5 77.5C315.791 82.0655 316.36 83.8102 319 85.5C340.291 73.9451 351.839 66.9387 371 52.5C391.084 39.3037 402.484 33.5298 423 25.5C435.067 21.0472 442.048 18.7976 456 16.5H482C491.261 17.9865 495.999 19.4607 503.5 23.5C514.475 34.2182 515.039 38.7674 516.5 47Z" />
              <path d="M338.5 27C332.381 43.1055 330.15 52.5749 329 70.5L336 63.5L352 51L364.5 37.5C368.794 30.6147 369.11 27.4975 369.5 22L366 14H354C347.173 17.8147 343.83 20.7445 338.5 27Z" />
              <path d="M378 25.5C379.015 30.7735 378.524 33.341 376.5 37.5L378 39L387 33L395.5 23.5L399.5 14C400.806 10.2631 400.511 8.62325 398 6.5C395.84 5.08023 394.494 4.35792 389.5 4.5C384.902 6.30587 383.236 8.09949 380.5 11.5C377.779 15.6913 377.801 19.1733 378 25.5Z" />
              <path d="M378 8.5C377.717 11.799 377.154 13.5688 375 16.5L373 18.5L371 16.5C371.405 14.3222 371.256 13.0232 370 10.5L371 6.5H376.5L378 8.5Z" />
              <path d="M405.5 3L403.5 11.5H406.5L409.5 10.5L412.5 6.5L414 3L409.5 0.5L405.5 3Z" />
              <path d="M408.5 13.5C402.535 18.4911 400.342 21.825 398 28.5L395.5 33L399.5 31L414 25.5C423.184 21.1817 427.506 20.6432 434 18.5L445.5 15C448.179 13.5876 449.318 12.6835 449.5 10.5C450.145 8.63857 449.611 7.53669 447.5 5.5C444.018 4.08417 441.763 3.50925 437 3C431.605 2.807 428.411 2.98335 422 4.5C416.654 6.71539 413.673 8.26696 408.5 13.5Z" />
              <path d="M312.5 105C303.931 101.579 299.37 99.3368 294.5 91L287 83C283.745 80.9978 281.571 80.4338 277 80.5C274.851 83.4521 273.731 85.3596 272.5 91C271.971 96.7412 273.321 99.7636 277 105C282.836 112.955 286.905 114.333 294.5 115.5C304.067 116.655 309.433 116.83 319 115.5C329.164 113.759 329.631 112.606 329 110.5L312.5 105Z" />
              <path d="M289.5 118L275.5 110.5L270 108.5H263.5C262.474 111.234 262.323 112.767 263.5 115.5C263.751 118.61 265.109 119.859 269 121.5C274.078 122.907 276.922 123.038 282 121.5L289.5 118Z" />
              <path d="M323 119L292.5 123.5L280.5 125.5L268 131L260 139V149C263.989 156.097 266.168 157.635 270 158C274.379 161.048 276.625 161.347 280.5 161C285.409 160.079 288.075 159.388 291.5 155.5C308.562 137.654 310.119 134.602 312.5 129.5C316.415 125.356 318.734 123.713 323 121.5C324.861 120.018 324.35 119.609 323 119Z" />
              <path d="M275.5 164L260 161L256.5 164L260 169H266L272 167.5L275.5 164Z" />
              <path d="M282 164C274.921 168.731 271.212 171.553 266 177.5L263.5 182.5C263.279 186.54 263.856 188.721 266 192.5C269.083 196.632 271.24 197.592 275.5 198C281.714 197.611 284.515 196.453 288.5 193L296.5 179L301 162.5V155.5C294.836 159.836 291.114 162.052 282 164Z" />
              <path d="M277 201.5L268 202.5L266 204V208.5H270L277 204V201.5Z" />
              <path d="M294.5 193C286.48 198.955 281.98 202.329 273.5 212.5V216.5V223L277 226.5H285C288.128 224.471 289.597 223.087 291.5 220C294.185 216.727 295.196 214.465 296.5 210C297.481 196.264 296.773 193.63 294.5 193Z" />
              <path d="M303.5 235C301.544 226.055 299.542 224.634 296.5 220C294.024 228.263 292.812 233.146 292.5 244.5L294.5 253L298 259L306 261.5L311 257.5L312.5 251.5C308.123 246.228 305.566 243.41 303.5 235Z" />
              <path d="M289.5 235L291.5 227.5C288.902 227.747 287.475 228.32 285 230.5C283.441 231.922 282.714 232.846 282 235C281.442 236.367 281.225 237.133 282 238.5L285 240C287.82 239.282 288.663 238.023 289.5 235Z" />
              <path d="M565 132C558.189 132.923 554.371 134.224 547.5 138C555.288 141.468 559.526 142.567 567 144C573.747 145.81 576.786 145.841 577 139C575.926 134.133 573.529 132.46 565 132Z" />
              <path d="M121.5 375.5H2L0.5 408C8.02981 382.492 19.7745 376.554 52 378.5L51 481C49.8747 489.129 46.5131 492.637 33 496V497.5H89.5V496C79.5428 495.283 75.1853 492.571 71 481V378C105.677 379.208 118.265 384.832 122.5 408L121.5 375.5Z" />
              <path d="M194.5 375.5H128.5C140.016 379.571 144.883 382.739 148 391.5V477.5C146.5 491.985 140.415 494.216 128.5 497H167V437L177 441C215.226 487.766 241.616 496.604 292.5 499C317.726 497 330.507 486.727 352.5 463C292.497 505.275 256.257 499.357 199 437C219.375 429.544 226.643 423.231 227 405.5C223.436 387.563 215.275 381.707 194.5 375.5Z" />
              <path d="M287 396C286.166 384.147 282.297 379.9 268 377.5V375.5H325V377.5C313.425 378.873 308.578 382.07 305.5 396L307 436C308.897 446.064 313.088 449.255 325 451.5H268C280.145 448.736 284.214 445.278 287 436V396Z" />
              <path d="M377.5 392.5C375.285 382.992 371.797 379.361 359.5 377.5V375.5H395.75H432C451.776 383.78 457.167 391.208 458.5 408.5C456.882 426.851 449.634 431.612 432 436L397 438L398 484C402.222 493.816 406.531 494.885 415 495V497.5H359.5V495C369.773 493.764 373.993 491.619 377.5 484V392.5Z" />
              <path d="M512.5 377.5C476.577 377.377 466.202 384.679 462 408.5H460.5L462 375.5H636V408.5H634.5C629.069 388.128 622.263 382.003 604.5 379H532V479C534.867 490.765 539.223 493.717 550 495V497.5H494.5V495C506.142 494.197 509.91 490.492 512.5 479V377.5Z" />
              <path d="M621 404.5H565V406C573.711 407.181 577.888 409.321 583.5 417V484.5C580.573 489.657 578.294 492.391 565 495V497.5H621.5V496C610.659 493.726 607.047 491.146 604.5 484.5V417C608.853 409.499 612.447 406.739 621 404.5Z" />
              <path d="M665 393C663.158 382.444 659.4 378.627 646 377V375.5H719C738.123 383.969 744.391 391.059 746.5 408.5C741.929 426.89 736.686 433.74 720 436.5L685.5 437.5V484.5C690.478 493.269 694.43 495.785 704 495V497.5H646V495C654.954 495.181 659.194 493.113 665 484.5V393Z" />
              <path d="M827 375.5V410C822.883 395.647 819.025 388.595 807.5 379C800.367 374.836 795.776 374.392 787 375.5C782.551 377.791 780.935 379.217 779.5 382C775.613 387.458 775.057 390.526 774.5 396C775.224 408.092 779.567 412.187 789.5 418C807.889 426.47 814.676 431.317 825.5 440C833.812 449.706 834.938 455.91 834.5 467.5C831.72 480.558 828.432 485.884 820.5 493C809.654 499.199 802.907 500.824 789.5 500L763.5 493C760.675 493.431 759.567 494.387 758.5 497.5H756.5V460.5H758.5L765 479C771.766 490.717 777.095 495.634 793 497.5C815.137 491.136 818.744 483.387 814.5 464.5C814.777 453.35 795.439 443.745 769 428C760.433 419.207 760.415 414.283 761 405.5C765.099 386 769.607 376.859 793 373C804.125 374.184 810.199 375.507 820.5 380L825.5 375.5H827Z" />
            </svg>
          </Link>
          <div
            className="hidden w-full lg:flex md:w-auto md:items-center"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-700 md:dark:bg-gray-700 dark:border-gray-600">
              <li className="flex items-center justify-center">
                {currentDbUser ? (
                  <Dropdown inline label={<>Szia {currentDbUser?.name}</>}>
                    <Dropdown.Divider />
                    <Dropdown.Item className="flex items-center  md:text-lg justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          notifySuccess(
                            `Sikeresen kijelentkeztél, ${currentDbUser.name}!`
                          );
                        }}
                      >
                        Kijelentkezés
                      </button>
                    </Dropdown.Item>
                    {currentDbUser?.isAdmin ? (
                      <Dropdown.Item className="flex items-center md:text-lg justify-center">
                        <Link
                          to="/admin/profile"
                          className="block text-gray-900  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Admin
                        </Link>
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item className="flex items-center   justify-center">
                        <Link
                          to="/user/profile"
                          className="block text-gray-900  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Profil
                        </Link>
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item className="flex items-center justify-center">
                      <Link
                        to="/user/reservations"
                        className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Saját foglalásaim
                      </Link>
                    </Dropdown.Item>
                  </Dropdown>
                ) : (
                  <button
                    className="block text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-gray-200 md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    type="button"
                    onClick={() => setOpenModal(true)}
                  >
                    Bejelentkezés/Regisztráció
                  </button>
                )}
              </li>

              <li className="flex items-center justify-center">
                <Link
                  to="/tours-tips"
                  className="block text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-gray-200 md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Túratippek
                </Link>
              </li>
              <li className="flex items-center justify-center">
                <Dropdown
                  inline
                  label={
                    <div className="h-fit flex justify-center items-center">
                      <div className="relative py-2 uppercase">
                        <p className="md:hover:text-lime-500  md:dark:hover:text-lime-500">
                          Kategóriák
                        </p>
                      </div>
                    </div>
                  }
                >
                  {categories?.map(({ id, name }) => (
                    <Dropdown.Item key={id} className="md:text-lg">
                      <Link to={`/tours?category=${name}`}>{name}</Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </li>
              <li className="flex items-center justify-center">
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-gray-200 md:dark:hover:text-lime-500 dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Rólunk
                </Link>
              </li>
              <li className="flex items-center justify-center">
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-gray-200 md:dark:hover:text-lime-500 dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Kapcsolat
                </Link>
              </li>
              <li className="flex items-center   justify-center">
                <CartIcon />
              </li>
              <li>
                <button
                  onClick={toggleDarkMode}
                  type="button"
                  className="flex items-center"
                >
                  {darkMode ? (
                    <span className="">
                      <img
                        src={switchoff}
                        alt="Switch On"
                        style={{ width: '55px', height: 'auto' }}
                      />
                    </span>
                  ) : (
                    <span className="flex items-center uppercase">
                      <img
                        src={switchon}
                        alt="Switch Off"
                        style={{ width: '55px', height: 'auto' }}
                      />
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
          <HiMenu
            className="taple-cell lg:hidden cursor-pointer text-6xl"
            onClick={handleOpenMenu}
          />
          {isMenuOpen && (
            <div
              className="w-full   lg:flex md:w-auto md:items-center"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col md:p-0  mt-8   border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-4 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className="flex items-center justify-center">
                  {currentDbUser ? (
                    <Dropdown inline label={<>Szia {currentDbUser?.name}</>}>
                      <Dropdown.Divider />
                      <Dropdown.Item className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            notifySuccess(
                              `Sikeresen kijelentkeztél, ${currentDbUser.name}!`
                            );
                          }}
                        >
                          Kijelentkezés
                        </button>
                      </Dropdown.Item>
                      {currentDbUser?.isAdmin ? (
                        <Dropdown.Item className="flex items-center justify-center">
                          <Link
                            to="/admin/profile"
                            className="block text-gray-900  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          >
                            Admin
                          </Link>
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item className="flex items-center justify-center">
                          <Link
                            to="/user/profile"
                            className="block text-gray-900  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          >
                            Profil
                          </Link>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item className="flex items-center justify-center">
                        <Link
                          to="/user/reservations"
                          className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Saját foglalásaim
                        </Link>
                      </Dropdown.Item>
                    </Dropdown>
                  ) : (
                    <button
                      className="block text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      type="button"
                      onClick={() => setOpenModal(true)}
                    >
                      Bejelentkezés/Regisztráció
                    </button>
                  )}
                </li>

                <li className="flex items-center justify-center">
                  <Link
                    to="/tours-tips"
                    className="block text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Túratippek
                  </Link>
                </li>
                <li className="flex items-center justify-center">
                  <Dropdown
                    inline
                    label={
                      <div className="h-fit flex justify-center items-center">
                        <div className="relative py-2 uppercase">
                          <p className="md:hover:text-lime-500 md:dark:hover:text-lime-500">
                            Kategóriák
                          </p>
                        </div>
                      </div>
                    }
                  >
                    {categories?.map(({ id, name }) => (
                      <Dropdown.Item key={id}>
                        <Link to={`/tours?category=${name}`}>{name}</Link>
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </li>
                <li className="flex items-center justify-center">
                  <Link
                    to="/about"
                    className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Rólunk
                  </Link>
                </li>
                <li className="flex items-center justify-center">
                  <Link
                    to="/contact"
                    className="block py-2 px-3 text-gray-900 uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-500 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Kapcsolat
                  </Link>
                </li>
                <li className="flex items-center justify-center">
                  <CartIcon />
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {openModal && (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Body>
            <div className="border-b border-gray-200 dark:border-gray-600">
              <ul className="flex justify-center">
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setOption('login')}
                    className={`${option === 'login' ? 'border-lime-500' : 'border-gray-100'} inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-lime-500 group`}
                  >
                    <svg
                      className={`${option === 'login' ? 'text-lime-500' : 'text-gray-400'} w-4 h-4 me-2 group-hover:text-lime-500`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    Bejelentkezés
                  </button>
                </li>
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setOption('register')}
                    className={`${option === 'register' ? 'border-lime-500' : 'border-gray-100'} inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-lime-500 group`}
                  >
                    <svg
                      className={`${option === 'register' ? 'text-lime-500' : 'text-gray-400'} w-4 h-4 me-2 group-hover:text-lime-500`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    Regisztráció
                  </button>
                </li>
              </ul>
            </div>
            <section className="flex justify-center">
              {option === 'login' && <LoginForm setModal={setOpenModal} />}
              {option === 'register' && (
                <RegisterForm setModal={setOpenModal} />
              )}
            </section>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
