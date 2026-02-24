import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../components/header";
import Footer from "../../components/footer";
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

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function HomePage() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-primary dark:bg-gray-950 pt-16 flex flex-col">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Routes location={location}>
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
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </>
  );
}
