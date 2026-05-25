import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { dummyOrders, assets } from "../../assets/assets";
import toast from "react-hot-toast";

function Orders() {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/transaction/allTransactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
    }
    
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders) {
    orders.forEach((item, index) => {
      item.cartitems.forEach((item1, index1) => {
        if (typeof item1 === "string") {
          item.cartitems[index1] = JSON.parse(item1);
        } else {
        }

        //item.cartitems[index1] = JSON.parse(item1);
      });
    });
  }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5  p-5  rounded-md border border-gray-300 "
          >
            <div className="flex gap-5 justify-between">
              <img
                className="w-12 h-12 object-cover "
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.cartitems.map((item, index) => (
                  <div key={index} className="flex flex-col ">
                    <p className="font-medium">
                      {item.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80">{order.cusname}</p>
                <p>{order.cusaddress} </p>

                <p>{order.cuscontact}</p>
              </div>
              <p className="font-medium text-lg my-auto ">
                {currency}
                {order.price}
              </p>
              <div className="flex flex-col text-sm md:text-base text-black/60 w-fit">
                <p>Method: {order.paymentoption}</p>
                <p>Date: {new Date(order.createdat).toLocaleDateString()}</p>
                <p>Payment: {order.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
