import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import AdminPage from "./pages/admin/adminPage.jsx";
import HomePage from "./pages/home/homePage.jsx";
import Testing from "./components/testing.jsx";
import LoginPage from "./pages/login/login.jsx";
import RegisterPage from "./pages/register/register.jsx";

function App() {
 
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>             
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
