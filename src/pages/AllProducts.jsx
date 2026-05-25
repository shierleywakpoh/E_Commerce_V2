import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const { products, searchQuery, setconditionQuantity } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setconditionQuantity("card");
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="flex flex-col gap-5 my-10 md:mx-24 mt-16 ">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-5">
        {filteredProducts
          .filter((product) => product.instock)
          .map((product, index) => (
            <ProductCard key={product.id} value={product} index={index} />
          ))}
      </div>
    </div>
  );
}

export default AllProducts;
