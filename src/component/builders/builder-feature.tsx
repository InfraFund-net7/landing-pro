import React from 'react';
import projectbuilder from '@/../public/image/builder-secret.png';
import Image from 'next/image';
import BuilderEnergyFlow from './builder-energy-flow';
import BuilderTokenFlow from './BuilderTokenFlow';

export default function BuilderFeature() {
  return (
    <div className=" fade-in w-full h-fit flex flex-col justify-center items-center gap-16 py-24 max-lg:py-16 max-md:py-10">
      <div className="flex flex-col text-center gap-5 px-4">
        <h2 className="text-5xl font-bold text-white max-md:text-3xl">
          &quot;Secret Sauce&quot; Feature
        </h2>
        <h3 className="text-2xl font-normal text-gray-100 max-md:text-base">
          Your Project, Upgraded with an AI-Driven Digital
        </h3>
        <h4 className="text-xl font-normal text-gray-100 max-md:text-sm">
          Our &quot;secret sauce.&quot; We create a dynamic virtual model of
          every project, providing live performance data and predictive risk
          analysis to de-risk your investment.
        </h4>
      </div>

      <div
        className="w-[1260px] h-[747px] bg-[url('/svg/builder-section.svg')] bg-cover bg-center bg-no-repeat py-10 flex justify-center items-start gap-16
                max-xl:w-[95%] max-lg:flex-col max-lg:items-center max-lg:gap-10 max-md:bg-none max-md:w-full max-md:px-4 max-md:h-auto"
      >
        <div className="w-[570px] h-[540px] flex justify-center items-center max-lg:w-[80%] max-md:w-full">
          <Image
            src={projectbuilder}
            width={570}
            height={417}
            alt="builder-project"
            className="w-full h-auto object-contain"
            style={{
              background:
                'linear-gradient(273.15deg, #FFFFFF -9.61%, #5C5C5C 142.04%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          />
        </div>

        <div className="flex flex-col gap-12 w-fit h-full max-lg:w-full max-md:gap-8">
          <div
            className="w-[534px] h-[228px] rounded-[20px]  flex flex-col justify-between items-center gap-3 p-5
  max-lg:w-full max-md:flex-col max-md:h-auto"
            style={{
              borderRadius: '20px',
              border: '2px solid transparent',
              borderImageSource:
                'linear-gradient(196.23deg, rgba(36, 255, 142, 0.02) 0%, rgba(36, 255, 142, 0.4) 50%, rgba(36, 255, 142, 0.02) 100%)',
              borderImageSlice: 1,
            }}
          >
            <div className="w-full h-fit flex justify-evenly items-center">
              <div className="flex flex-col text-center w-fit h-fit gap-2">
                <h4 className="text-xl text-white font-normal max-md:text-base">
                  Energy Generated
                </h4>
                <span className="text-2xl text-white font-bold max-md:text-xl">
                  1.21 GW
                </span>
              </div>
              <div className="flex flex-col text-center w-fit h-fit gap-2">
                <h4 className="text-xl text-white font-normal max-md:text-base">
                  Co2 Saved
                </h4>
                <span className="text-2xl text-white font-bold max-md:text-xl">
                  850 Tons/Year
                </span>
              </div>
            </div>

            <hr
              style={{
                width: '100%',
                border: '2px solid transparent',
                borderImageSource:
                  'linear-gradient(196.23deg, rgba(36, 255, 142, 0.02) 0%, rgba(36, 255, 142, 0.4) 50%, rgba(36, 255, 142, 0.02) 100%)',
                borderImageSlice: 1,
              }}
            />

            <div className="w-full h-fit flex justify-evenly items-center">
              <div className="flex flex-col text-center w-fit h-fit gap-2">
                <h4 className="text-xl text-white font-normal max-md:text-base">
                  Performance
                </h4>
                <span className="text-2xl text-white font-bold max-md:text-xl">
                  98.7%
                </span>
              </div>
              <div className="flex flex-col text-center w-fit h-fit gap-2">
                <h4 className="text-xl text-white font-normal max-md:text-base">
                  Token Value
                </h4>
                <span className="text-2xl text-white font-bold max-md:text-xl">
                  £1.7
                </span>
              </div>
            </div>
          </div>

          <div className="w-[534px] h-[200px] flex justify-center items-center max-lg:w-full max-md:w-full">
            <BuilderEnergyFlow />
          </div>
          <div className="w-[534px] h-[208px] flex justify-center items-center max-lg:w-full max-md:w-full">
            <BuilderTokenFlow />
          </div>
        </div>
      </div>
    </div>
  );
}
