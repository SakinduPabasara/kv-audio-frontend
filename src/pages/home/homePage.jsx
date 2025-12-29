import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Items from "./items";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";

export default function HomePage(){
    return(
        <>
            <Header />
            <div className="w-full h-[calc(100vh-100px)] bg-primary">
                <Routes path="/*">
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/gallery" element={<Gallery/>} />
                    <Route path="/items" element={<Items/>} />
                    <Route path="/product/:key" element={<ProductOverview/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/*" element={<ErrorNotFound/>}/>
                </Routes>
            </div>
        </>
    )
}