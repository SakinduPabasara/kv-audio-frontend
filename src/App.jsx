import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import AdminPage from "./pages/admin/adminPage.jsx";
import HomePage from "./pages/home/homePage.jsx";
import Testing from "./components/testing.jsx";
import LoginPage from "./pages/login/login.jsx";

function App() {
 
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes path="/*">
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/login" element={<LoginPage/>}/>             
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
