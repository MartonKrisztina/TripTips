import React from 'react';
import { useSpring, animated } from 'react-spring';
import turistajelzesek from '../../assets/turistajelzesek.png';
import idojaras from '../../assets/idojaras.png';
import terkep from '../../assets/terkep.png';
import hiking from '../../assets/hiking.png';
import szemet from '../../assets/szemet.png';
import food from '../../assets/food.png';
import fo1 from '../../assets/fo1.png';
import to from '../../assets/to.jpg';
import tuzijatek from '../../assets/tuzijatek.jpg';
import satorozas from '../../assets/satorozas.jpg';
import turazas from '../../assets/turazas.jpg';
import BackToTop from '../../utils/BackToTop';

export default function ToursTips() {
  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      className="bg-lime-100 rounded-lg bg-center w-full dark:bg-gray-800 dark:text-gray-400"
      style={{ opacity }}
    >
      <div id="oldal-teteje">
        <img
          src={fo1}
          alt="kép"
          loading="lazy"
          className="w-full h-64 md:h-96 rounded-lg"
          style={{ backgroundSize: 'cover' }}
        />
      </div>
      <div className="mb-12" id="hiking">
        <h2 className="text-xl italic uppercase mt-6 mb-4">
          Túrázás és gyalogos túrák
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            loading="lazy"
            className="rounded-lg bg-cover p-20 text-sm text-black"
            style={{
              backgroundImage: `url(${idojaras})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />

          <div className="mt-4 text-sm text-black dark:text-gray-200">
            <h1 className="font-semibold">
              Mindig ellenőrizd az időjárás-előrejelzést, és készülj fel az
              aktuális körülményekre megfelelően. Viselj megfelelő ruházatot és
              felszerelést az időjárási viszonyoknak megfelelően.
            </h1>
          </div>

          <div
            loading="lazy"
            className="rounded-lg bg-cover p-20 text-sm text-black dark:text-gray-200"
            style={{
              backgroundImage: `url(${terkep})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div className="mt-4 text-sm text-black dark:text-gray-200">
            <h1 className="font-semibold">
              Ismerd fel az útvonalat. Legyen nálad térkép vagy navigációs
              eszköz a túra során. A tájékozódás kulcsfontosságú a túrázás
              során. Ha eltévedsz, egy térkép vagy navigációs eszköz segíthet
              megtalálni az utad vissza a jelzett útra.
            </h1>
          </div>

          <div
            loading="lazy"
            className="rounded-lg bg-cover p-20 text-sm text-black"
            style={{
              backgroundImage: `url(${hiking})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div className="mt-4 text-sm text-black dark:text-gray-200">
            <h1 className="font-semibold">
              Győződj meg róla, hogy megfelelő felszereléssel rendelkezel,
              például megfelelő túrabakancsokkal, ruházattal, tűzgyújtóval,
              elsősegélycsomaggal stb.
            </h1>
          </div>

          <div
            loading="lazy"
            className="rounded-lg bg-cover p-20 text-sm text-black"
            style={{
              backgroundImage: `url(${food})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div className="mt-4 text-sm text-black dark:text-gray-200">
            <h1 className="font-semibold">
              Vigyél elegendő mennyiségű vizet és táplálékot magaddal, különösen
              hosszabb túrák esetén. Fontos hidratált maradni és energiát
              biztosítani a túra során. Egy kis csomag szárított gyümölcs, keksz
              vagy energia szelet mindig jól jöhet.
            </h1>
          </div>

          <div
            loading="lazy"
            className="rounded-lg bg-cover p-20 text-sm text-black "
            style={{
              backgroundImage: `url(${szemet})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div className="mt-4 text-sm text-black dark:text-gray-200">
            <h1 className="font-semibold">
              Tartsd tiszteletben a természetet, ne hagyj magad után szemetet,
              és kövesd a helyi szabályokat és rendelkezéseket. Legyél felelős
              túrázó és óvd a környezetet. Legyél felelős túrázó és óvd a
              környezetet.
            </h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <div className="bg-black rounded-full h-0.5 w-full md:w-96 dark:bg-lime-400" />
      </div>

      <div className="mb-12" id="hiking-indications">
        <h2 className="text-xl italic uppercase mt-6 mb-4">Túristajelzések</h2>
        <div className="flex flex-col md:flex-row items-center">
          <img
            loading="lazy"
            className="max-w-80 w-full mr-0 md:mr-4 rounded-lg md:rounded-none mb-4 md:mb-0"
            src={turistajelzesek}
            alt="túristajezések"
          />
          <ul className="text-base font-medium">
            <li>
              <span className="text-blue-500 font-bold">Kék sáv </span>
              jelzés mutatja a legfőbb, országos jelentőségű útvonalakat,
              illetve egyes tájegységek helyi jelentőségű fő útvonalát.
            </li>
            <li>
              <span className="text-red-500 font-bold">Piros sáv </span>
              jelöli a legalább egy tájegységen átvezető, illetve a kiemelt
              jelentőségű helyi utakat.
            </li>
            <li>
              <span className="text-yellow-300 font-bold">Sárga sáv </span>
              tájékoztat a helyi fontosságú gerinchálózati útvonalakról.
            </li>
            <li>
              <span className="text-green-500 font-bold">Zöld sáv </span>
              jelzi a helyi útvonalakat.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-black rounded-full h-0.5 w-full md:w-96 dark:bg-lime-400" />
      </div>

      <div className="text-white dark:text-gray-200" id="our-tours">
        <h2 className="text-xl italic text-black uppercase mt-6 mb-4 dark:text-gray-400">
          Utazási kínálatunk
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div
            loading="lazy"
            className="p-6 rounded-lg hover:scale-110 transition-transform duration-200"
            style={{
              backgroundImage: `url(${to})`,
            }}
          >
            <h3 className="text-2xl mb-4">Klasszikus körutazás</h3>
            <p className="text-lg">
              A klasszikus körutazások ideálisak azoknak, akik szeretnék
              felfedezni egy adott terület legfontosabb látnivalóit és
              helyszíneit.
            </p>
          </div>
          <div
            loading="lazy"
            className="p-6 rounded-lg hover:scale-110 transition-transform duration-200"
            style={{
              backgroundImage: `url(${turazas})`,
            }}
          >
            <h3 className="text-2xl mb-4">Gyalogos túra</h3>
            <p className="text-lg">
              A gyalogos túrák kiváló lehetőséget nyújtanak a természet
              közvetlen megismerésére és élvezetére, valamint a testmozgásra.
            </p>
          </div>
          <div
            loading="lazy"
            className="p-6 rounded-lg hover:scale-110 transition-transform duration-200"
            style={{
              backgroundImage: `url(${tuzijatek})`,
            }}
          >
            <h3 className="text-2xl mb-4">Ünnepi körutazás</h3>
            <p className="text-lg">
              Az ünnepi körutazások különleges élményt nyújtanak az ünnepek
              alkalmából dekorált városok és területek felfedezésére.
            </p>
          </div>
          <div
            loading="lazy"
            className="p-6 rounded-lg hover:scale-110 transition-transform duration-200"
            style={{
              backgroundImage: `url(${satorozas})`,
            }}
          >
            <h3 className="text-2xl mb-4">Túrázás</h3>
            <p className="text-lg ">
              A túrázás számos formája létezik, beleértve a hegymászást, az
              expedíciókat és az extrém körülmények közötti túrákat is.
            </p>
          </div>
        </div>
      </div>
      <BackToTop />
    </animated.div>
  );
}
