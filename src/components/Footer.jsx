import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";

function Footer() {
  return (
    <div className="px-16 pt-10 bg-primary/10  mt-24 md:mx-24  gap-4 ">
      <div className="flex border-b border-gray-200 pb-5  flex-rows justify-between">
        <div className="   text-gray-500  ">
          <img src={assets.logo} alt="logo" className="" width={150} />
          <p className="max-w-[410px] mt-6">
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable
          </p>
        </div>
        <div className="flex flex-wrap text-gray-600 justify-between w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base  mb-5">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} GreatStack.dev All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
