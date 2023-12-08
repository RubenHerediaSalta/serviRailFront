import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import FiverrLogo from "../FiverrLogo";

function FiverrBusiness() {
  return (
    <div className="bg-5 px-10 md:px-20 py-10 md:py-16 flex gap-10">
      <div className="text-white flex flex-col gap-6 justify-center items-start">
        <div className="flex gap-2">
          {/* <FiverrLogo fillColor={"#ffffff"} /> */}
          <span className="text-white text-3xl font-bold">Unite a Servify</span>
        </div>
        <h2 className="text-3xl font-bold">Que estas esperando para formar parte</h2>
        <h4 className="text-xl">
          Completar con info
        </h4>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-[#62646a] text-2xl" />
            <span>Experiencia sin igual</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-[#62646a] text-2xl" />
            <span>Soluciones a tu medida</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-[#62646a] text-2xl" />
            <span>Profesionales confiables</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-[#62646a] text-2xl" />
            <span>Servicios para cada necesidad</span>
          </li>
        </ul>
        {/* <button
          className="border text-base font-medium px-5 py-2   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
          type="button"
        >
          Explore Fiverr Business
        </button> */}
      </div>
      <div className="relative h-[512px] w-2/3 hidden md:block">
        <Image src="/business.webp" alt="bsiness" fill />
      </div>
    </div>
  );
}

export default FiverrBusiness;
