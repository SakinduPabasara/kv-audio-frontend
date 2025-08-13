import "./App.css";
import { useState } from "react";
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

function App() {
    return(
        <div className="w-full h-screen flex">
            <div className="w-[300px] h-full bg-green-200">
                <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <BsGraphDown/>
                    Dashboard
                </button>
                <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <FaRegBookmark/>
                    Bookings
                </button>
                <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <MdOutlineSpeaker/>
                    Items
                </button>
                <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
                    <FaRegUser/>  
                    Users
                </button>
            </div>

            <div className="w-full bg-red-900">
            </div>

            
        </div>
    )
}

export default App;





// import "./App.css";
// import { useState } from "react";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Email:", email);
//     console.log("Password:", password);
//     // Your login logic here
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         {/* Title */}
//         <h2 className="login-title">
//           Welcome Back 👋
//         </h2>
//         <p className="login-subtitle">
//           Please login to your account
//         </p>

//         {/* Form */}
//         <form onSubmit={handleLogin} className="login-form">
//           {/* Email */}
//           <div className="form-group">
//             <label className="form-label">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           {/* Password */}
//           <div className="form-group">
//             <label className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="form-input"
//             />
//           </div>

//           {/* Remember + Forgot */}
//           <div className="form-options">
//             <label className="checkbox-label">
//               <input type="checkbox" className="checkbox" />
//               <span>Remember me</span>
//             </label>
//             <a href="#" className="forgot-link">
//               Forgot password?
//             </a>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="login-button"
//           >
//             Login
//           </button>
//         </form>

//         {/* Sign up link */}
//         <p className="signup-text">
//           Don't have an account?{" "}
//           <a href="#" className="signup-link">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;







