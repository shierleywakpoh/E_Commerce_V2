import React from "react";
import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Categories() {
  const { navigate } = useAppContext();
  return (
    <div className="flex flex-col gap-5 my-10 md:mx-24 mt-16 ">
      <p className="text-xl font-medium ">Categories</p>

      <div className="grid grid-cols-7  gap-6 ">
        {categories.map((value, index) => (
          <div
            onClick={() => {
              navigate(`products/${value.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            key={index}
            style={{ backgroundColor: value.bgColor }}
            className={`group cursor-pointer  py-5 px-3 rounded-lg gap-2 items-center flex flex-col `}
          >
            <img
              src={value.image}
              alt={value.text}
              className="max-w-28 group-hover:scale-108 transition"
            />
            <p className="group-hover:scale-108 transition text-center text-sm font-medium">
              {value.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
