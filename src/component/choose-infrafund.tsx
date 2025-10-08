import React from "react";
import UnlockPrivate from "@/../public/svg/unlock-private.svg";
import FinanceSpeed from "@/../public/svg/finance.svg";
import InvestConfidence from "@/../public/svg/invest.svg";
import ShapeFuture from "@/../public/svg/shape-future.svg";
import Image from "next/image";
import stars from "@/../public/image/stars.png";
export default function ChooseInfraFund() {
  const chosenItems = [
    {
      title: "Unlock the Private Market",
      icon: UnlockPrivate,
      bottom: "170px",
      description:
        "Gain direct access to vetted, high-impact renewable energy infrastructure—an asset class previously reserved for institutional players.",
    },
    {
      title: "Finance at the Speed of a Click",
      icon: FinanceSpeed,
      description:
        "Our platform connects you directly to project builders, removing costly intermediaries and cutting fundraising timelines from years to weeks.",
    },
    {
      title: "Invest with Confidence",
      icon: InvestConfidence,
      bottom: "170px",
      description:
        "Monitor project progress and financial transactions in real-time.  Our AI-driven Digital Twin provides unparalleled transparency into asset performance.",
    },
    {
      title: "Shape the Future",
      icon: ShapeFuture,
      description:
        "Participate in key project decisions through our DAO-based governance model. Your investment gives you a voice.",
    },
  ];

  return (
    <div className="w-full h-fit px-20 flex flex-col justify-center items-center gap-20 mb-28  relative">
      <h2 className="text-[42px] text-white font-bold">
        Why Choose InfraFund?
      </h2>
      <div className="w-[1000px] h-[600px] absolute z-0 right-0">
        <Image src={stars} width={588} height={588} alt="stars" className="absolute z-20 top-[5%] right-[10%]" />
        <div className="w-[1000px] h-[588px] rounded-full absolute z-10" style={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
          filter: "blur(400px)",
        }} />
      </div>
      <div className="w-full h-fit px-[88px] grid grid-cols-2 justify-center items-center relative z-10">
        {chosenItems.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: item.bottom || "0px",
            }}
            className="w-fit h-fit flex justify-center items-center gap-3.5 "
          >
            <Image src={item.icon} alt={item.title} width={135} height={135} />
            <div className="flex flex-col gap-3.5">
              <h3 className="text-white font-semibold text-2xl">
                {item.title}
              </h3>
              <p className="text-white text-lg max-w-[400px]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
