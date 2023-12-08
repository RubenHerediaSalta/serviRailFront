import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { useMediaQuery } from "@react-hook/media-query";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function PopularServices() {
  const router = useRouter();
  const popularServicesData = [
    {
      name: "Asesoramiento",
      label: "Completar con información sobre asesoramiento",
      image: "/service1.png"
    },
    {
      name: "Belleza",
      label: "Completar con información sobre belleza",
      image: "/service2.jpeg"
    },
    {
      name: "Apoyo Escolar",
      label: "Completar con información sobre apoyo escolar",
      image: "/service3.jpeg",
    },
    {
      name: "Cursos",
      label: "Completar con información sobre cursos",
      image: "/service4.jpeg",
    },
    {
      name: "Eventos",
      label: "Completar con información sobre eventos",
      image: "/service5.jpeg",
    },
    {
      name: "Turismo",
      label: "Completar con información sobre turismo",
      image: "/service6.jpeg"
    },
    {
      name: "Salud",
      label: "Completar con información sobre salud",
      image: "/service7.jpeg",
    },
    {
      name: "Moda",
      label: "Completar con información sobre moda",
      image: "/service8.jpeg"
    },
    {
      name: "Mascotas",
      label: "Completar con información sobre mascotas",
      image: "/service2.jpeg"
    },
    {
      name: "Transporte",
      label: "Completar con información sobre transporte",
      image: "/service3.jpeg"
    },
  ];

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 768px)");

  let slidesPerView = 4; // Valor predeterminado para escritorio

  if (isTablet) {
    slidesPerView = 3; // Cambiar a 3 en tablet
  }

  if (isMobile) {
    slidesPerView = 2; // Cambiar a 2 en móvil
  }

  return (
    <div className="mx-4 md:mx-8 lg:mx-20 my-3">
      <h2 className="text-4xl mb-5 text-[#404145] font-bold">
        Servicios Populares
      </h2>

      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={5}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {popularServicesData.map(({ name, label, image }) => (
          <SwiperSlide key={name} className="relative cursor-pointer" onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}>
            <div className="absolute z-10 text-white left-5 top-4">
              <span>{label}</span>
              <h6 className="font-extrabold text-2xl">{name}</h6>
            </div>
            <div className="h-80 w-full">
              <Image src={image} layout="fill" objectFit="cover" alt={`service-${name}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PopularServices;