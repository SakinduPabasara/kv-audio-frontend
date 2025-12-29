import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";

export default function ProductOverview(props) { 
    const params = useParams();   // Hook to access URL parameters
    const key = params.key;       // Get the product key from the URL parameters
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const[product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`).then((res) => {
            setProduct(res.data);
            setLoadingStatus("loaded");
            console.log(res.data);
        }).catch((err) => {
            console.error(err);
            setLoadingStatus("error");
        }); 
    },[]) 

    return (
        <div className="w-full h-full flex justify-center">
            {
                loadingStatus === "loading" && <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full"></div>
                </div>
            }
            {
                loadingStatus === "loaded" && <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[49%] h-full">
                        <ImageSlider images={product.image} />
                    </div>
                    <div className="w-[49%] h-full flex flex-col items-center">
                        <h1 className="text-4xl font-bold text-accent">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-800">{product.category}</h2>
                        <p className="text-md text-gray-700 mt-6">{product.description}</p>
                        <p className="text-lg font-bold text-green-500">Rs.{product.price}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <span className="font-medium">Dimensions:</span> {product.dimensions}
                        </div>
                    </div>
                </div>
            }
            {
                loadingStatus === "error" && <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-accent">Error loading product details. Please try again later.</h1>
                </div>
            }
        </div>
    )
}