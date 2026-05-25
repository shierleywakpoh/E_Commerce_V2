import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";
import toast from "react-hot-toast";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, cartItems, DeleteCard } = useAppContext();
  //const [newCartItems, setNewCartItems] = useState([]);
  let newCartItems;

  const fetchMyOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get("/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyOrders(data);
    } catch (error) {
      if (error.response.data.message == "Unauthorized") {
        toast.error("Please Login");
      } else if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  const deleteCartItems = async () => {
    
    cartItems.map((value, index) => {
      DeleteCard(value.id);
    });
  };

  useEffect(() => {
    deleteCartItems();
    fetchMyOrders();
  }, []);

  if (myOrders) {
    myOrders.forEach((item, index) => {
      item.cartitems.forEach((item1, index1) => {
        if (typeof item1 === "string") {
          item.cartitems[index1] = JSON.parse(item1);
        } else {
        }

        //item.cartitems[index1] = JSON.parse(item1);
      });
    });
  }

  /**
  if (myOrders){
    setNewCartItems(()=>myOrders.cartitems)
  }
   */

  return (
    <div className="px-24 pt-10">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      {myOrders.length > 0 ? (
        <div className=" grid grid-cols-2 ">
          {myOrders.map((a, b) => (
            <div key={b} className=" w-120 my-2 p-3 border border-gray-300">
              <p>Status Delivery: {a.status} </p>
              <div className=" my-5 flex  ">
                <div>
                  {a.cartitems.map((c, d) => (
                    <div key={d} className="flex m-3">
                      <div className="flex flex-col gap-2 ">
                        <img
                          src={`http://localhost:4000/${c.imageurl[0]}`}
                          alt=""
                          className="w-20 "
                        />
                      </div>
                      <div className="flex flex-col mx-6">
                        <p>Name Product: {c.name}</p>
                        <p>Quantity: {c.quantity}</p>
                        <p>Price: {c.quantity * c.offerprice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p>Total Price: {a.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>There is no orders</p>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
