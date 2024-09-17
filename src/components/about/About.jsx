import { FaEnvelope, FaPhone } from 'react-icons/fa';
import bgabout from '../../assets/bgabout.jpg';
import avatar01 from '../../assets/avatar01.jpg';
import avatar02 from '../../assets/avatar02.jpg';
import avatar03 from '../../assets/avatar03.jpg';
import avatar04 from '../../assets/avatar04.jpg';

export default function About() {
  return (
    <div className="flex-col justify-center">
      <div className="h-96 md:max-w-full overflow-hidden flex justify-center items-center relative">
        <img src={bgabout} alt="bgabout" className="object-cover relative" />
        <h1 className="uppercase absolute text-4xl md:text-8xl font-bold text-white">
          Rólunk
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 md:max-w-fit bg-lime-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {[
          {
            name: 'Kinyikné Szabó Tünde',
            role: 'Értékesítő',
            email: 'ertekesito@triptips.com',
            phone: '+36 01 234 5678',
            avatar: avatar01,
          },
          {
            name: 'Márton Krisztina',
            role: 'Referens',
            email: 'referens@triptips.com',
            phone: '+36 01 801 2345',
            avatar: avatar02,
          },
          {
            name: 'Kapusi Éva',
            role: 'Marketing Manager',
            email: 'marketingmanager@triptips.com',
            phone: '+36 01 567 8901',
            avatar: avatar03,
          },
          {
            name: 'Oláh Viktoria',
            role: 'Pénzügy',
            email: 'penzugy@triptips.com',
            phone: '+36 01 123 4567',
            avatar: avatar04,
          },
        ].map((employee, index) => (
          <div
            key={employee.phone}
            className="flex justify-center items-center w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="max-w-lg rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-md">
              <div className="p-4">
                <img
                  className="w-64 h-64 mx-auto rounded-full"
                  src={employee.avatar}
                  alt={`avatar${index + 1}`}
                />
                <div className="text-center mt-4">
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                    {employee.name}
                  </h5>
                  <p className="text-lg text-gray-700 dark:text-gray-400">
                    {employee.role}
                  </p>
                  <div className="flex justify-center mt-4">
                    <p className="text-gray-700 dark:text-gray-400 flex items-center">
                      <FaEnvelope className="mr-2" /> {employee.email}
                    </p>
                  </div>
                  <div className="flex justify-center mt-2">
                    <p className="text-gray-700 dark:text-gray-400 flex items-center">
                      <FaPhone className="mr-2" /> {employee.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
