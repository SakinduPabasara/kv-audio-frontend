// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";
// import mediaUpload from "../../utils/mediaUpload";

// export default function UpdateItemPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // If user navigates directly without state, redirect back
//   useEffect(() => {
//     if (!location.state) {
//       toast.error("No product selected to edit");
//       navigate("/admin/items");
//     }
//   }, [location.state, navigate]);

//   const [productKey, setProductKey] = useState(location.state?.key || "");
//   const [productName, setProductName] = useState(location.state?.name || "");
//   const [productPrice, setProductPrice] = useState(location.state?.price || 0);
//   const [productCategory, setProductCategory] = useState(
//     location.state?.category || "audio"
//   );
//   const [productDimensions, setProductDimensions] = useState(
//     location.state?.dimensions || ""
//   );
//   const [productDescription, setProductDescription] = useState(
//     location.state?.description || ""
//   );
//   const [productImages, setProductImages] = useState([]);

//   async function handleUpdateItem() {

//     let updatingImages = location.state?.image || [];

//     if (productImages.length > 0) {
//       const promises = [];

//       for (let i = 0; i < productImages.length; i++) {
//         console.log(productImages[i]);
//         const promise = mediaUpload(productImages[i]);
//         promises.push(promise);
        
//       }

//       updatingImages = await Promise.all(promises);
//     }

//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const result = await axios.put(
//           `${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`,
//           {
//             name: productName,
//             price: productPrice,
//             category: productCategory,
//             dimensions: productDimensions,
//             description: productDescription,
//             image: updatingImages,
//           },
//           {
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           }
//         );
//         toast.success(result.data.message);
//         navigate("/admin/items");
//       } catch (err) {
//         toast.error(err.response?.data?.error || "Failed to update item");
//       }
//     } else {
//       toast.error("You are not authorized to update items.");
//     }
//   }

//   return (
//     <div className="w-full h-full flex flex-col items-center">
//       <h1 className="text-2xl font-bold my-4">Update Item</h1>

//       <div className="w-[400px] border flex flex-col items-center gap-3 p-4 rounded-lg shadow">
//         <input
//           disabled
//           type="text"
//           placeholder="Product Key"
//           value={productKey}
//           onChange={(e) => setProductKey(e.target.value)}
//           className="border p-2 w-full rounded"
//         />

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           className="border p-2 w-full rounded"
//         />

//         <input
//           type="number"
//           placeholder="Product Price"
//           value={productPrice}
//           onChange={(e) => setProductPrice(e.target.value)}
//           className="border p-2 w-full rounded"
//         />

//         <select
//           value={productCategory}
//           onChange={(e) => setProductCategory(e.target.value)}
//           className="border p-2 w-full rounded"
//         >
//           <option value="audio">Audio</option>
//           <option value="lights">Lights</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Product Dimensions"
//           value={productDimensions}
//           onChange={(e) => setProductDimensions(e.target.value)}
//           className="border p-2 w-full rounded"
//         />

//         <textarea
//           type="text"
//           placeholder="Product Description"
//           value={productDescription}
//           onChange={(e) => setProductDescription(e.target.value)}
//           className="border p-2 w-full rounded"
//         />

//         <input
//           type="file"
//           multiple
//           onChange={(e) => setProductImages(Array.from(e.target.files))}
//           className="w-full p-2 border rounded"
//         />

//         <button
//           onClick={handleUpdateItem}
//           className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
//         >
//           Update Item
//         </button>
//         <button
//           onClick={() => navigate("/admin/items")}
//           className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }



import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // If user navigates directly without state, redirect back
  useEffect(() => {
    if (!location.state) {
      toast.error("No product selected to edit");
      navigate("/admin/items", { replace: true });
    }
  }, [location.state, navigate]);

  const [productKey, setProductKey] = useState(location.state?.key || "");
  const [productName, setProductName] = useState(location.state?.name || "");
  const [productPrice, setProductPrice] = useState(location.state?.price || 0);
  const [productCategory, setProductCategory] = useState(
    location.state?.category || "audio"
  );
  const [productDimensions, setProductDimensions] = useState(
    location.state?.dimensions || ""
  );
  const [productDescription, setProductDescription] = useState(
    location.state?.description || ""
  );

  // keep as array of Files
  const [productImages, setProductImages] = useState([]);

  const [loading, setLoading] = useState(false);

  async function handleUpdateItem() {
    if (loading) return;

    // safety: if user refreshed or no key
    if (!productKey) {
      toast.error("Product key is missing.");
      return;
    }

    //  backend URL safety
    const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");
    if (!backendUrl) {
      toast.error("VITE_BACKEND_URL is not set.");
      return;
    }

    setLoading(true);

    try {
      // Keep old images if no new images selected
      let updatingImages = location.state?.image || [];

      // Upload new images if user selected any
      if (productImages.length > 0) {
        const promises = [];

        for (let i = 0; i < productImages.length; i++) {
          const promise = mediaUpload(productImages[i]);
          promises.push(promise);
        }

        //  if upload fails, show error
        updatingImages = await Promise.all(promises);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authorized to update items.");
        return;
      }

      const result = await axios.put(
        `${backendUrl}/api/products/${encodeURIComponent(productKey)}`,
        {
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimensions,
          description: productDescription,
          image: updatingImages,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success(result.data?.message || "Updated successfully");
      navigate("/admin/items");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || err.message || "Failed to update item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Update Item</h1>

      <div className="w-[400px] border flex flex-col items-center gap-3 p-4 rounded-lg shadow">
        <input
          disabled
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

        <input
          type="file"
          multiple
          onChange={(e) => setProductImages(Array.from(e.target.files || []))}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleUpdateItem}
          disabled={loading}
          className={`w-full text-white px-4 py-2 rounded transition ${
            loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Updating..." : "Update Item"}
        </button>

        <button
          onClick={() => navigate("/admin/items")}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


