import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { SearchIcon, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const {
    user,
    setUser,
    setShowUserLogin,
    showUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartItems,
    totalQuantity,
    setCartItems,
    getCart,
  } = useAppContext();
  const logout = async () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem("token");
    navigate("/");

    toast.success("Logout Successfully");
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getCart();
    }
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="py-4 px-6 flex transition-all items-center border-b border-gray-300 justify-between text-gray-700 px-16 ">
      <NavLink to="/">
        <img src={assets.logo} alt="logo" className="h-9" />
      </NavLink>
      <div className="flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Product</NavLink>
        <NavLink to="/my-orders">My Orders</NavLink>
        <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <SearchIcon className="w-4 h-4" />
        </div>
        <button
          onChange={() => {
            setconditionQuantity("cart");
          }}
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <div className=" border border-green-300 items-center bg-primary rounded-full w-4 h-4 absolute -right-1 -top-1 text-center text-[10px] text-white hover:bg-primary-dull">
            {totalQuantity()}
          </div>
          <ShoppingCart className="w-6 " />
        </button>
        {!user ? (
          <button
            onClick={() => {
              setShowUserLogin(true);
            }}
            className=" cursor-pointer bg-primary rounded-full px-8 py-2 text-white hover:bg-primary-dull transition"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-10" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
