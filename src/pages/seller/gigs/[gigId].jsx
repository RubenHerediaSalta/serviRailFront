import ImageUpload from "../../../components/ImageUpload";
import { categories } from "../../../utils/categories";
import { EDIT_GIG_DATA, HOST } from "../../../utils/constants";
import { GET_GIG_DATA } from "../../../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function EditGig() {
  const [cookies] = useCookies();
  const router = useRouter();
  const { gigId } = router.query;
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900 ";
  const [files, setFile] = useState([]);
  const [features, setfeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    feature: "",
    shortDesc: "",
    number: "",
  });
  const [fetchedImages, setFetchedImages] = useState([]);

  const removeFeature = (index) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setfeatures(clonedFeatures);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addFeature = () => {
    if (data.feature) {
      setfeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };

  const editGig = async () => {
    const { category, description, title, shortDesc, number } =
      data;
    if (
      category &&
      description &&
      title &&
      features.length &&
      files.length &&
      shortDesc.length &&
      number.length
    ) {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const gigData = {
        title,
        description,
        category,
        features,
        shortDesc,
        number,
      };
      const response = await axios.put(`${EDIT_GIG_DATA}/${gigId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.jwt}`,
        },
        params: gigData,
      });
      if (response.status === 200) {
        router.push("/seller/gigs");
      }
    }
  };

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const {
          data: { gig },
        } = await axios.get(`${GET_GIG_DATA}/${gigId}`);
        setData({ ...gig, time: gig.revisions });
        setfeatures(gig.features);
        setFetchedImages(gig.images);

        const imagePromises = gig.images.map((image) => {
          const url = HOST + "/uploads/gigs/" + image;
          const fileName = image;
          return fetch(url)
            .then(async (response) => {
              const contentType = response.headers.get("content-type");
              const blob = await response.blob();
              return new File([blob], fileName, { contentType });
            })
            .catch((error) => {
              console.error("Error fetching image:", error);
              return null;
            });
        });

        Promise.all(imagePromises)
          .then((imageFiles) => {
            const filteredImageFiles = imageFiles.filter((file) => file !== null);
            setFile(filteredImageFiles);
          })
          .catch((error) => {
            console.error("Error fetching images:", error);
          });
      } catch (err) {
        console.log(err);
      }
    };

    if (gigId) fetchGigData();
  }, [gigId]);

  return (
    <div className="min-h-screen p-6 md:p-10 lg:p-20">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-5">
        Editar Servicio
      </h1>
      <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-900 mb-5">
        Campos a modificar
      </h3>
      <form className="flex flex-col gap-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className={labelClassName}>
              Título
            </label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              type="text"
              id="title"
              className={inputClassName}
              placeholder="e.g. I will do something I'm really good at"
              required
            />
          </div>
          <div>
            <label htmlFor="categories" className={labelClassName}>
              Seleccione una categoría
            </label>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              name="category"
              onChange={handleChange}
              value={data.category}
            >
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className={labelClassName}>
            Descripción
          </label>
          <textarea
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a short description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <div>
            <label htmlFor="features" className={labelClassName}>
              Etiquetas
            </label>
            <div className="flex gap-3 items-center mb-5">
              <input
                type="text"
                id="features"
                className={inputClassName}
                placeholder="Enter a Feature Name"
                name="feature"
                value={data.feature}
                onChange={handleChange}
              />
              <button
                type="button"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
                onClick={addFeature}
              >
                Agregar
              </button>
            </div>
            <ul className="flex gap-2 flex-wrap">
              {features.map((feature, index) => {
                return (
                  <li
                    key={feature + index.toString()}
                    className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                  >
                    <span>{feature}</span>
                    <span
                      className="text-red-700"
                      onClick={() => removeFeature(index)}
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <label htmlFor="image" className={labelClassName}>
              Imagenes
            </label>
            <div>
              <ImageUpload files={files} setFile={setFile} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <div>
            <label htmlFor="shortDesc" className={labelClassName}>
              Descripción corta
            </label>
            <input
              type="text"
              className={`${inputClassName} w-full md:w-1/2 lg:w-1/3 xl:w-1/3`}
              id="shortDesc"
              placeholder="Enter a short description."
              name="shortDesc"
              value={data.shortDesc}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="number" className={labelClassName}>
              Número de contacto
            </label>
            <input
              type="text"
              className={`${inputClassName} w-full md:w-1/2 lg:w-1/3 xl:w-1/3`}
              id="number"
              placeholder="Enter a short description."
              name="number"
              value={data.number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5 md:items-center lg:items-center xl:items-center">
          <button
            className="border text-lg font-semibold px-5 py-3   border-[#2499c7] bg-[#2499c7] hover:bg-blue-800 text-white rounded-md"
            type="button"
            onClick={editGig}
          >
            Editar
          </button>
          <button
            className="border text-lg font-semibold px-5 py-3 mx-3 border-[#0a0a70] bg-[#0a0a70] text-white rounded-md"
            type="button"
            onClick={() => router.push("/")}
          >
            Volver al inicio
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGig;
