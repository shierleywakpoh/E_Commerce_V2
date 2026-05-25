import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

function BestSeller() {
  const { products } = useAppContext();
  return (
    <div className="my-10 md:mx-24  justify-center gap-6">
      <p className="text-xl font-medium ">BestSeller</p>

      <div className="flex justify-between">
        {products.slice(0, 5).map((value, index) => (
          <ProductCard key={value.id} value={value} index={index} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
