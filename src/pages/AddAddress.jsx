import React, { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none
  text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

function AddAddress() {
  const { axios } = useAppContext();
  const [address, setAddress] = useState({
    FirstName: " ",
    LastName: " ",
    Email: " ",
    Street: " ",
    City: " ",
    State: " ",
    Zipcode: " ",
    Country: " ",
    Phone: " ",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/address", {
        address: JSON.stringify(address),
      });
      if (data.message == "Register succesfully") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went error");
      }
    }
  };
  return (
    <div className="px-24 pt-10">
      <p className="text-2xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>{" "}
      </p>
      <div className="flex flex-col-reverse justify-between mt-4 md:flex-row">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4 -my-0.5 text-gray-500">
              <label>First Name:</label>
              <label>Last Name:</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="FirstName"
                type="text"
                placeholder="First Name"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="LastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <label className="text-gray-500">Email:</label>
            <InputField
              handleChange={handleChange}
              address={address}
              name="Email"
              type="email"
              placeholder="Email address"
            />
            <label className="text-gray-500">Street:</label>
            <InputField
              handleChange={handleChange}
              address={address}
              name="Street"
              type="text"
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-4 -my-0.5 text-gray-500">
              <label>City:</label>
              <label>State:</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="City"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="State"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 -my-0.5 text-gray-500">
              <label>Zipcode:</label>
              <label>Country:</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="Zipcode"
                type="number"
                placeholder="Zip code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="Country"
                type="text"
                placeholder="Country"
              />
            </div>
            <label className="text-gray-500">Phone Number:</label>
            <InputField
              handleChange={handleChange}
              address={address}
              name="Phone"
              type="text"
              placeholder="Phone"
            />
            <button
              onClick={() => {
                navigate(`/cart`);
                scrollTo(0, 0);
              }}
              className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase"
            >
              Save address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 md:mt-0 mb-16"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
}

export default AddAddress;
