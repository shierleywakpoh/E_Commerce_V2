import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [conditionQuantity, setconditionQuantity] = useState("card");
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [Items, setItems] = useState();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});

  const currency = import.meta.env.VITE_CURRENCY;

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/product");
      if (data.message == "fetch data successfully") {
        setProducts(data.result);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getCart = async () => {
    try {
      const token1 = localStorage.getItem("token");
      const { data } = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${token1}`,
        },
      });

      setCartItems(data);
    } catch (error) {
      if (error.response.data.message == "User does not have cart") {
        setCartItems([]);
        toast.error(error.response.data.message);
      } else if (error.response) {
        toast.error(error.response.data.message || "Login gagal");
      } else {
        toast.error("Terjadi kesalahan jaringan");
      }
    }
  };

  useEffect(() => {
    //setProducts((prev) => [...dummyProducts]);
    fetchProducts();
  }, []);
  if (isSeller == false) {
    // localStorage.removeItem("token");
  }
  const AddToCard = async (productId) => {
    //setCartItems([...cartItems, { productId: productId, quantity: 1 }]);

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/cart",
        { productId: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message == "Added item is successfully") {
        getCart();
        return toast.success("Added to Cart");
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      if (error.response.data.message == "Unauthorized") {
        toast.error("Please Login");
      } else if (error.response) {
        toast.error(error.response.data.message || "Login gagal");
      } else {
        toast.error("Terjadi kesalahan jaringan");
      }
    }

    //setCartItems((prevUser) => ({ ...prevUser, _id: "gd46g23h", quantity: 1 }));
    //toast.success("Added to Cart");
  };
  const UpdateCard = async (productId, quantity = 1, idCart) => {
    console.log("conditionQuantity", conditionQuantity);
    /**
     * if (conditionQuantity == "cart") {
      setCartItems((prevUser) =>
        prevUser.map((item) =>
          item.productId === productId ? { ...item, quantity: qty } : item
        )
      );
      toast.success("Cart Updated");
    } else if (conditionQuantity == "card") {
      setCartItems((prevUser) =>
        prevUser.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
     */
    if (conditionQuantity == "cart") {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.put(
          `/cart/${idCart}`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.message == "Changed cart is successfully") {
          getCart();
          toast.success("Cart Updated");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Login gagal");
        } else {
          toast.error("Terjadi kesalahan jaringan");
        }
      }
    } else if (conditionQuantity == "card") {
      try {
        const token = localStorage.getItem("token");
        quantity = quantity + 1;

        const { data } = await axios.put(
          `/cart/${idCart}`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.message == "Changed cart is successfully") {
          getCart();
          toast.success("Cart Updated");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Login gagal");
        } else {
          toast.error("Terjadi kesalahan jaringan");
        }
      }
    }
  };
  const DeleteCard = async (idCart, quantity = 1, productId = 1) => {
    console.log("idCart", idCart);
    console.log("quantity", quantity);
    console.log("productId", productId);
    if (quantity > 1) {
      try {
        const token = localStorage.getItem("token");
        quantity = quantity - 1;

        const { data } = await axios.put(
          `/cart/${idCart}`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.message == "Changed cart is successfully") {
          getCart();
          toast.success("Cart Updated");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Login gagal");
        } else {
          toast.error("Terjadi kesalahan jaringan");
        }
      }
    } else {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.delete(
          `/cart/${idCart}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.message == "Deleted cart is sucessfully") {
          getCart();
          toast.success("deleted cart is successfully");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Login gagal");
        } else {
          toast.error("Terjadi kesalahan jaringan");
        }
      }
    }
    /**
     * 
    setCartItems((prevUser) =>
      prevUser
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Number(item.quantity) - 1 }
            : item
        )
        .filter((item) => !(item.quantity == 0))
    );
    toast.success("Removed from Cart");
     */
  };

  const totalQuantity = () => {
    let tQuantity = 0;

    cartItems.map((items) => (tQuantity += items.quantity));
    return tQuantity;
  };

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    currency,
    cartItems,
    setCartItems,
    AddToCard,
    setItems,
    Items,
    UpdateCard,
    DeleteCard,
    products,
    searchQuery,
    setSearchQuery,
    totalQuantity,
    axios,
    fetchProducts,
    conditionQuantity,
    setconditionQuantity,
    getCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
