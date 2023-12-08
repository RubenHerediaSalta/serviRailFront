import ImageUpload from "../../../components/ImageUpload";
import { categories } from "../../../utils/categories";
import { ADD_GIG_ROUTE } from "../../../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function CreateGigs() {
  const [cookies] = useCookies();
  const router = useRouter();
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

  const addGig = async () => {
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
      const response = await axios.post(ADD_GIG_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.jwt}`,
        },
        params: gigData,
      });
      if (response.status === 201) {
        router.push("/seller/gigs");
      }
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-5 md:px-10">
      <h1 className="text-4xl md:text-6xl text-gray-900 mb-5">Crear nuevo servicio</h1>
      <h3 className="text-2xl md:text-3xl text-gray-900 mb-5">
        Complete los campos
      </h3>
      <form action="" className="flex flex-col gap-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
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
              placeholder="Que servicio vas a ofrecer"
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
              defaultValue="Choose a Category"
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
            placeholder="Escriba la descripción completa sobre su servicio"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
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
                className="focus:outline-none text-white bg-[#2499c7] hover:bg-blue-800  font-medium  text-lg px-5 md:px-10 py-3 rounded-md "
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <div>
            <label htmlFor="shortDesc" className={labelClassName}>
              Descripción corta
            </label>
            <input
              type="text"
              className={inputClassName}
              id="shortDesc"
              placeholder="Breve descripción."
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
              className={inputClassName}
              id="number"
              placeholder="ej: 3875123456"
              name="number"
              value={data.number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button
            className="border text-lg font-semibold px-5 py-3   border-[#2499c7] bg-[#2499c7] hover:bg-blue-800 text-white rounded-md"
            type="button"
            onClick={addGig}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGigs;
