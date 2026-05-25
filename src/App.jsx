import React from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import AllProduct from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import CartProduct from "./pages/CartProduct";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/admin/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";

const App = () => {
  const { user, setUser, setShowUserLogin, showUserLogin, navigate, isSeller } =
    useAppContext();
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div className="text-default min-h-screen  text-gray-700 bg-white">
      <Toaster />

      {!isSellerPath && <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Routes>
        if () {}
        <Route index element={isSeller ? <AddProduct /> : <Home />} />
        <Route path="/products" element={<AllProduct />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartProduct />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route
          path="/seller/*"
          element={isSeller ? <SellerLayout /> : <SellerLogin />}
        >
          <Route index element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
