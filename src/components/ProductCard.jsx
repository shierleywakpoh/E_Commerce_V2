import React, { useEffect, useState } from "react";
import { dummyProducts, assets } from "../assets/assets";
import { Star } from "lucide-react";
import { useAppContext } from "../context/AppContext";

function ProductCard({ value, index }) {
  const {
    currency,
    cartItems,
    AddToCard,
    setItems,
    Items,
    UpdateCard,
    DeleteCard,
    products,
    navigate,
    setconditionQuantity,
    isTransactionSucces,
    setIsTransactionSucces,
  } = useAppContext();

  const cart = cartItems.find((item) => value.id == item.product_id);
  useEffect(() => {
    setIsTransactionSucces(false);
  });
  return (
    <div className=" mt-5 flex flex-wrap justify-center gap-6">
      {value && (
        <div
          onClick={() => {
            navigate(`/products/${value.category.toLowerCase()}/${value.id}`);
            scrollTo(0, 0);
          }}
          key={index}
          className="px-4 border border-gray-500/20 rounded-md py-2 bg-white  "
        >
          <div className="flex">
            <img
              src={`http://localhost:4000/${value.imageurl[0]}`}
              alt=""
              className="max-w-36 justify-center cursor-pointer hover:scale-105 transition"
            />
          </div>
          <p className="text-gray-500/60 text-sm">{value.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {value.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3.5 w-3"
                  src={i < 4 ? assets.star_icon : assets.add_icon}
                  alt=""
                />
              ))}
            <p className="text-primary text-sm">(4)</p>
          </div>

          <div className="flex gap-1.5 items-end justify-between mt-3">
            <p className=" text-base text-md font-medium text-green-500">
              {currency} {value.offerprice}{" "}
              <span className="text-gray-500/60 text-sm  line-through">
                {currency}
                {value.price}
              </span>
            </p>

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary"
            >
              {!cart ? (
                <button
                  onClick={() => {
                    //const productId = {productId:value._id}

                    AddToCard(value.id);
                  }}
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[70px] h-[25px] rounded"
                >
                  <img src={assets.cart_icon} alt="cart_icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 w-20 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => {
                      DeleteCard(cart.id, cart.quantity, cart.product_id);
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5">{cart.quantity}</span>
                  <button
                    onClick={() => {
                      UpdateCard(cart.product_id, cart.quantity, cart.id);
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
