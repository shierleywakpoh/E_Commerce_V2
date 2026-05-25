import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function Login() {
  const [state, setState] = React.useState("login");

  const [userLogin, setUserLogin] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setShowUserLogin, setUser, axios, getCart } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (userLogin == "login") {
        const { data } = await axios.post("/customerRegister/Login", {
          email,
          password,
        });
        if (data.message == "Login succesfully") {
          localStorage.setItem("token", data.token);

          getCart();
          setUser({ email, password });
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else if (userLogin == "register") {
        const { data } = await axios.post("/customerRegister", {
          name,
          email,
          password,
        });
        if (data.message == "Register succesfully") {
          localStorage.setItem("token", data.token);

          setUser({ email, password });
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login gagal");
      } else {
        toast.error("Terjadi kesalahan jaringan");
      }
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex  text-sm text-gray-600 bg-black/60"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {userLogin === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        {userLogin === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => {
                setUserLogin("login");
                setState("login");
              }}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => {
                setUserLogin("register");
                setState("signup");
              }}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {userLogin === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
