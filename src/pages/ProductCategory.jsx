import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

function ProductCategory() {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );
  return (
    <div>
      {searchCategory && (
        <div className="flex flex-col my-10 md:mx-24 mt-16 ">
          <div className="flex flex-col items-end w-max">
            <p className="text-2xl font-medium">
              {searchCategory.text.toUpperCase()}
            </p>
            <div className="w-16 h-0.5  bg-primary rounded-full "></div>
          </div>
        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div className="flex my-10 md:mx-24 mt-16 gap-3 ">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} value={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]"></div>
      )}
    </div>
  );
}

export default ProductCategory;
