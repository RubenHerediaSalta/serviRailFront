import { categories } from "../../utils/categories";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Services() {
  const router = useRouter();

  return (
    <div className="mx-10 my-16 ">
      <h2 className="text-4xl mb-10 text-[#404145] font-bold ">
        Lo que necesites, encontralo aquí.
      </h2>
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map(({ name, logo }) => {
          return (
            <li
              key={name}
              className="flex flex-col justify-center text-center items-center cursor-pointer hover:shadow-2xl hover:border-[#1DBF73]  border-2 border-transparent py-3 transition-all duration-500"
              onClick={() => router.push(`/search?category=${name}`)}
            >
              <Image src={logo} alt="category" height={50} width={50} />
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Services;
