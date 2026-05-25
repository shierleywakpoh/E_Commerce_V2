import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="  my-10 md:mx-24 bg-[url('./assets/main_banner_bg.png')] bg-cover bg-center h-100">
      <div className="flex flex-col justify-center pl-20 h-full">
        <h1 className="text-4xl h-auto font-bold">
          Freshness You can <br />
          Trust, Saving You <br />
          will Love!
        </h1>
        <div className="flex flex-row  mt-6 gap-2 ">
          <Link to={"/products"}className=" flex  items-center  justify-center  bg-primary hover:bg-primary-dull transition cursor-pointer  text-white px-9 py-3 rounded-md">
            Show now
          </Link>
          <Link to={"/products"}className=" flex gap-2 items-center  justify-center   hover:bg-primary-dull transition cursor-pointer   px-9 py-3 rounded-md">
            Explore deals
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
