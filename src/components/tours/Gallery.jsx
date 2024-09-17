import useReadAllTours from '../../hooks/tours/useReadAllTours';
import Loading from '../../utils/Loading';

export default function Gallery() {
  const { data: tours, isLoading } = useReadAllTours();

  return (
    <>
      <div className="font-bold w-full h-40 flex items-center justify-center">
        <h1 className="uppercase text-4xl ms:text-xl lg:text-6xl  md:text-5xl font-bold italic text-wrap">
          Kép galéria
        </h1>
      </div>
      <div className="gallery-container w-full h-fit">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mr-2 ml-2 mb-14">
            {tours.map(({ tourImage, id }) => (
              <img
                key={id}
                src={tourImage}
                alt={`gallery-${id}`}
                className="object-cover h-full w-full rounded-lg hover:scale-150 transition-transform duration-300"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
