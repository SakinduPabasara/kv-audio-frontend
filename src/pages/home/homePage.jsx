import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Items from "./items";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import Cart from "./cart";
import Orders from "./orders";
import Inquiries from "./inquiries";
import Dashboard from "./dashboard";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-primary pt-16">
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/items" element={<Items />} />
          <Route path="/product/:key" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<ErrorNotFound />} />
        </Routes>
      </div>
    </>
  );
}
