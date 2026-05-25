import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assets, dummyProducts } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(0);
  const { currency, products, AddToCard, navigate } = useAppContext();
  const product = products.find((item) => item.id === Number(id));

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = products.filter(
        (item) => product.category === item.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  if (!product) {
    return (
      <div className="flex justify-center my-20">Loading product data...</div>
    );
  }
  return (
    <div className="flex flex-col items-center  my-10 md:mx-24 mt-16">
      <div className="  ">
        <div className="font-bold">
          <Link to={"/"}>Home </Link> / <Link to={"/products"}>Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}{" "}
          </Link>
          / <span className="text-primary">{product.name} </span>
        </div>
        <div className="gap-3 flex flex-rows  mt-6">
          <div className=" flex flex-col gap-3 max-w-23  overflow-hidden cursor-pointer ">
            {product.imageurl.map((_, img) => (
              <div
                key={img}
                onClick={() => setThumbnail(img)}
                className="border border-gray-500/30 rounded"
              >
                <img
                  key={img}
                  src={`http://localhost:4000/${product.imageurl[img]}`}
                  alt=""
                  className=""
                />
              </div>
            ))}
          </div>
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={`http://localhost:4000/${product.imageurl[thumbnail]}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm flex flex-col justify-center ml-6 ">
            <h1 className="text-3xl font-medium">{dummyProducts[0].name}</h1>
            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    className="w-3.5  "
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                  />
                ))}
              <p className="text-base ml-2">(4)</p>
            </div>

            <p className="text-gray-500/70 line-through">
              MRP: {currency}
              {product.price}
            </p>

            <p className="text-2xl font-medium">
              MRP: {currency}
              {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
            <p className="text-base font-medium mt-6">About Product</p>
            

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => AddToCard(product.id)}
                className="w-50 py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition p-10"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  AddToCard(product.id);
                  navigate("/cart");
                }}
                className="w-40 py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-indigo-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-16 flex-col items-center w-max">
        <div>
          <p className="text-3xl font-medium">Related Product</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>
        <div className="mt-6 flex gap-6">
          {relatedProducts
            .filter((product, index) => product.inStock)
            .map((product, index) => (
              <ProductCard value={product} index={index} />
            ))}
        </div>
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
