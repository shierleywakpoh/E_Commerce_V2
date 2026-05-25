import React from "react";
import { assets, features } from "../assets/assets";

function BottomBanner() {
  return (
    <div className="relative my-10 md:mx-24 mt-16">
      <img src={assets.bottom_banner_image} alt="" className="w-full" />
      <div className="absolute inset-0 flex flex-col  items-end justify-center pr-24">
        <div>
          <h1 className="text-3xl font-semibold text-primary">
            Why We Are the Best?
          </h1>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              <img src={feature.icon} alt={feature.title} className="w-11 " />
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-500/70 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
