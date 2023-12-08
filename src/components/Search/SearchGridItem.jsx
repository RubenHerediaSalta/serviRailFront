import { HOST, IMAGES_URL, API_URL } from "../../utils/constants";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";



function SearchGridItem({ gig }) {
  const router = useRouter();
  const [cookies, setCookies] = useCookies();

  const [isFavorite, setIsFavorite] = useState(false);
  const [, dispatch] = useStateProvider();


  const calculateRatings = () => {
    const { reviews } = gig;
    let rating = 0;
    if (!reviews?.length) {
      return 0;
    }
    reviews?.forEach((review) => {
      rating += review.rating;
    });
    return (rating / reviews.length).toFixed(1);
  };

  // const handleToggleFavorite = (e) => {
  //   e.stopPropagation(); // Evita que el clic en el botón propague al contenedor y abra la página del gig.
  //   setIsFavorite(!isFavorite);
  // };



  // const handleToggleFavorite = async (e) => {
  //   e.stopPropagation();

  //   // Aquí debes realizar la solicitud al servidor para agregar o quitar el gig de favoritos.
  //   // Puedes usar la ruta correspondiente del backend para manejar esto.

  //   try {
  //     const response = await fetch(`${API_URL}/favorites/toggle-favorite/${gig.id}`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${cookies.jwt}`,
  //       },
  //     });

  //     if (response.ok) {
  //       // La solicitud fue exitosa, actualiza el estado local.

  //       setIsFavorite(!isFavorite);

  //     } else {
  //       // Manejar errores si es necesario.
  //       console.error('Error al cambiar el estado de favoritos.');
  //     }
  //   } catch (error) {
  //     console.error('Error de red:', error);
  //   }
  // };

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();

    try {
      const response = await fetch(`${API_URL}/favorites/toggle-favorite/${gig.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });

      if (response.ok) {
        // En lugar de actualizar el estado local, envía una acción al contexto de estado.
        dispatch({
          type: reducerCases.TOGGLE_FAVORITE,
          gigId: gig.id,
        });
      } else {
        console.error('Error al cambiar el estado de favoritos.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  return (
    <div
      className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8 relative"
      onClick={() => router.push(`/gig/${gig.id}`)}
    >
      <div className="relative w-64 h-40">
        <Image
          src={`${IMAGES_URL}/gigs/${gig.images[0]}`}
          alt="gig"
          fill
          className="rounded-xl"
        />
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={handleToggleFavorite}
          style={{ zIndex: 1 }} // Ajusta el z-index para que el botón esté sobre la imagen
        >
          <FaHeart size={20} color={isFavorite ? "red" : "gray"} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div>
          {gig.createdBy.profileImage ? (
            <Image
              src={HOST + "/" + gig.createdBy.profileImage}
              alt="profile"
              height={30}
              width={30}
              className="rounded-full"
            />
          ) : (
            <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
              <span className="text-lg text-white">
                {gig.createdBy.email[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-md ">
          <strong className="font-medium">{gig.createdBy.username}</strong>
        </span>
      </div>
      <div>
        <p className="line-clamp-2 text-[#404145]">{gig.title}</p>
      </div>
      <div className="flex items-center gap-1 text-yellow-400">
        <FaStar />
        <span>
          <strong className="font-medium">{calculateRatings()}</strong>
        </span>
        <span className="text-[#74767e]">({gig?.reviews?.length})</span>
      </div>
      {/* <div>
        <strong className="font-medium">From ${gig.price}</strong>
      </div> */}
    </div>
  );
}

export default SearchGridItem;
