import React from "react";
import UnlockPrivate from "@/../public/svg/unlock-private.svg";
import FinanceSpeed from "@/../public/svg/finance.svg";
import InvestConfidence from "@/../public/svg/invest.svg";
import ShapeFuture from "@/../public/svg/shape-future.svg";
import Image from "next/image";
export default function ChooseInfraFund() {
  const chosenItems = [
    {
      title: "Unlock the Private Market",
      icon: UnlockPrivate,
      description:
        "Gain direct access to vetted, high-impact renewable energy infrastructure—an asset class previously reserved for institutional players.",
    },
    {
      title: "Finance at the Speed of a Click",
      icon: FinanceSpeed,
      bottom:"16px",
      description:
        "Our platform connects you directly to project builders, removing costly intermediaries and cutting fundraising timelines from years to weeks.",
    },
    {
      title: "Invest with Confidence",
      icon: InvestConfidence,
      description:
        "Monitor project progress and financial transactions in real-time.  Our AI-driven Digital Twin provides unparalleled transparency into asset performance.",
    },
    {
      title: "Shape the Future",
      icon: ShapeFuture,
      bottom:"16px",
      description:
        "Participate in key project decisions through our DAO-based governance model. Your investment gives you a voice.",
    },
  ];
  return (
    <div className="w-full h-fit px-20 flex flex-col justify-center items-center gap-16 mb-20">
      <h2 className="text-[42px] text-white font-bold">
        Why Choose InfraFund?
      </h2>
      <div className="w-full h-fit px-[88px] grid grid-cols-2 justify-center items-center  gap-36">
        {chosenItems.map((item, index) => (
          <div
            className={`w-fit h-fit flex justify-center items-center gap-3.5 -mb-[${item.bottom || "0px"}]`}
            key={index}
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
