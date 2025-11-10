import React from 'react';
import solar from '@/../public/image/solar.jpg';
import SolarPanel from '@/../public/image/solarpanel.jpg';
import wind from '@/../public/image/wind-turbin.jpg';
import PowerWind from '@/../public/image/power-wind.jpg';
import Image from 'next/image';
export default function Tokenization() {
  const tokens = [
    { name: 'Token 1', img: solar, position: '-left-5' },
    { name: 'Token 2', img: SolarPanel, position: 'right-5' },
    { name: 'Token 3', img: wind, position: 'right-5 bottom-10' },
    { name: 'Token 4', img: PowerWind, position: 'right-5 bottom-10' },
  ];
  return (
    <div className="flex flex-col pt-12 bg-red-500 w-full h-fit gap-4 justify-center items-center relative">
      <h2 className="font-bold text-center mb-6 text-5xl">
        The Single Operating System for Real-World <br /> Energy Asset
        Tokenization
      </h2>
      <span className="text-xl font-normal">
        From real-world assets to digital tokens in simple approach.
      </span>
      <div className="relative w-full h-full">
        {tokens.map((item, index) => (
          <Image
            key={index}
            className={`rounded-[60px] absolute ${item.position}`}
            src={item.img}
            width={436}
            height={249}
            alt={item.name}
          />
        ))}
      </div>
    </div>
  );
}
