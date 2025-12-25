import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
    const [state, setState] = useState("loading");  //loading, success, error
    const [items, setItems] = useState([]);  // Array to hold items
    useEffect(()=>{
        if (state == "loading") {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)   // Fetch items from the backend
            .then((res) => {
              console.log(res.data);  // Log the fetched data
              setItems(res.data);  // Set the items state with the fetched data
              setState("success");  // Update state to success

            }).catch((err) => {
                toast.error(err?.response?.data?.error || "Failed to fetch items");  // Handle error response
                setState("error");  // Update state to error if fetching fails
            })
        }
            
    },[])
    return (
      <div className="w-full h-screen flex flex-wrap justify-center pt-[50px]">
        
        {state == "loading" && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
          </div>
        )}
        {
           state == "success" && 
           items.map((item)=>{
            return(
                <ProductCard key={item.key} item={item}/>
            )

           }) 
        }
        
      </div>
    );
}


