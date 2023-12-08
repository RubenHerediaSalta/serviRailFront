import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function HomeBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const interval = setInterval(
      () => setImage((prevImage) => (prevImage >= 6 ? 1 : prevImage + 1)),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="relative bg-cover h-[380px] md:h-[380px] lg:h-[580px] xl:h-[680px]">
      <div className="absolute top-0 right-0 w-full h-full transition-opacity z-0">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Image
            key={index}
            alt="hero"
            src={`/bg-hero${index}.webp`}
            fill
            className={`${image === index ? "opacity-100" : "opacity-0"} transition-all duration-1000`}
          />
        ))}
      </div>
      <div className="z-10 relative w-full max-w-screen-md mx-auto flex flex-col items-center justify-center h-full gap-5 ">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug text-center md:text-left">
          Encuentra los&nbsp;
          <i>servicios</i>
          <br />
          perfectos para vos y tus necesidades.
        </h1>
        <div className="flex flex-col md:flex-row items-center w-80 md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <div className="relative w-full md:w-[450px] lg:w-[550px] xl:w-[650px]">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              className="h-11 w-full lg:w-[450px] pl-10 rounded"
              placeholder={`Prueba una búsqueda ej: salud`}
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
          <button
            className="bg-[#1DBF73] text-white px-4 md:px-12 py-2 text-md md:text-lg font-semibold rounded-md md:rounded-r-md mt-4 md:mt-0"
            onClick={() => router.push(`/search?q=${searchData}`)}
          >
            Buscar
          </button>
        </div>
        <div className="text-white flex flex-col items-center justify-center md:flex-row gap-4 w-full overflow-x-auto">
          <span className="mb-2 md:mb-0">Populares:</span>
          <ul className="flex gap-2 md:gap-5">
            <li
              className="text-sm py-1 px-2 md:py-1 md:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=website design")}
            >
              ASESORAMIENTO
            </li>
            <li
              className="text-sm py-1 px-2 md:py-1 md:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=wordpress")}
            >
              BELLEZA
            </li>
            <li
              className="text-sm py-1 px-2 md:py-1 md:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=logo design")}
            >
              EVENTOS
            </li>
            <li
              className="text-sm py-1 px-2 md:py-1 md:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=ai services")}
            >
              TURISMO
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
