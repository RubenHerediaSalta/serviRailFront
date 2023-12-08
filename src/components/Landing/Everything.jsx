import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useMediaQuery } from "@react-hook/media-query";

function Everything() {
  const everythingData = [
    {
      title: "Apegate a tu presupuesto",
      subtitle:
        "Completar con info extra",
    },
    {
      title: "Obtén trabajo de calidad rápidamente",
      subtitle:
        "Completar con info extra",
    },
    {
      title: "Paga cuando estés satisfecho",
      subtitle:
        "Completar con info extra",
    },
    {
      title: "Gran variedad de servicios y prestadores",
      subtitle:
        "Completar con info extra",
    },
  ];



  return (
    <div className="bg-2 flex py-10 justify-between px-14 md:px-24">
      <div>
        <h2 className="text-4xl mb-5 text-[#f0f0f0] font-bold">
          POR QUÉ SERVIFY?
        </h2>
        <ul className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => {
            return (
              <li key={title}>
                <div className="flex gap-2 items-center text-xl text-[#ffd700]">
                  <BsCheckCircle className="text-[#e0ffff]" />
                  <h4>{title}</h4>
                </div>
                <p className="text-[#e0ffff]">{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative h-96 w-2/4 hidden md:block">
        <Image src="/everything.webp" fill alt="everything" />
      </div>
    </div>
  );
}

export default Everything;
