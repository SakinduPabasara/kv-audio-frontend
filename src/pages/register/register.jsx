import { useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      password,
      address,
      phone,
    });
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        address: address,
        phone: phone,
    }).then(()=>{
        toast.success("Registration successful!");
        navigate("/login");
    }).catch((err)=>{
        toast.error(err?.response?.data?.error||"An error occured");   // Handle error response
    })
  }

  return (
    <div className="bg-picture h-screen w-full flex justify-center items-center">
      <form onSubmit={handleOnSubmit} autoComplete="off">
        <div className="w-[400px] h-[550px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative">
          <img
            src="/logo.png"
            alt="logo"
            className="w-[100px] h-[100px] object-cover top-1"
          />

          <input
            type="text"
            placeholder="First Name"
            autoComplete="off"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            autoComplete="off"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            autoComplete="new-email"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            autoComplete="off"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            autoComplete="off"
            className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="my-6 w-[300px] h-[50px] bg-[#f0ad38] text-white text-2xl rounded-lg">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
