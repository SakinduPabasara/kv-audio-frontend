
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const navigate = useNavigate();

  async function handleAddItem() {
    console.log(productKey, productName, productPrice, productCategory, productDimensions, productDescription);

    const token = localStorage.getItem("token");

    if(token){
        try {
          const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/products`,
            {
              key: productKey,
              name: productName,
              price: productPrice,
              category: productCategory,
              dimensions: productDimensions,
              description: productDescription,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          toast.success(result.data.message);
          navigate("/admin/items");

          

        } catch (err) {
          toast.error(err.response.data.error);
        }
    }else{
        toast.error("You are not authorized to add items.");
    }

  }



  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Add Items</h1>

      <div className="w-[400px] border flex flex-col items-center gap-3 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="audio">Audio</option>
          <option value="lights">Lights</option>
        </select>

        <input
          type="text"
          placeholder="Product Dimensions"
          value={productDimensions}
          onChange={(e) => setProductDimensions(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <textarea
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleAddItem}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
        <button
          onClick={()=> navigate("/admin/items")}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
}


