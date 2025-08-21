import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";


export default function AdminItemsPage() {
  const [items, setItems] = useState([]); // Using sample data for demonstration
  const [itemsLoaded, setItemsLoaded] = useState(false);   // State flag used to trigger re-fetching items when updated (e.g. after delete)
  const navigate = useNavigate();

  // useEffect - Fetch items from the API when the component mounts
  useEffect(() => {
    // PROBLEM: The original logic was checking if itemsLoaded is true before making API call
    // But itemsLoaded starts as false, so the API call never happens!
    
    // SOLUTION: We need to make the API call when itemsLoaded is false (initial load)
    // OR we can trigger it differently. Let's use a different approach:
    
    // Check if we need to fetch items (either initial load or after delete)
    if (!itemsLoaded) {     // Changed from itemsLoaded to !itemsLoaded
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Fetched items:", res.data);
          setItems(res.data);
          setItemsLoaded(true);   // Mark as loaded after successful fetch
        })
        .catch((err) => {
          console.error("Error fetching items:", err);
          // Even if there's an error, we should stop loading
          //setItemsLoaded(true);
        });
    }

  }, [itemsLoaded]); // This dependency means: run useEffect whenever itemsLoaded changes

  const handleDelete = (itemKey) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // First, update the UI immediately for better user experience
      setItems(items.filter((item) => item.key !== itemKey));
      
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3000/api/products/${itemKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Item deleted successfully:", res.data);
          // After successful delete, trigger a re-fetch to ensure data is in sync
          setItemsLoaded(false); // This will trigger useEffect to fetch fresh data
        })
        .catch((err) => {
          console.error("Error deleting item:", err);
          // If delete fails, we should revert the UI change
          // For now, we'll just log the error
        });
    }
  };

  return (
    <div className="w-full h-full relative p-4 flex items-center flex-col">
      {/* Show loading spinner when items are not loaded */}
      {!itemsLoaded && (
        <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px]"></div>
      )}

      {/* Show table when items are loaded */}
      {itemsLoaded && (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full max-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Key</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Dimensions</th>
                <th className="px-6 py-3 text-left">Availability</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product, index) => (
                <tr
                  key={product.key}
                  className={`border${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 border">{product.key}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 border">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 border">${product.price}</td>
                  <td className="px-6 py-4 capitalize border">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 border">{product.dimensions}</td>
                  <td className="p-3 border">
                    {/* Fixed the CSS class - was missing the number after px- */}
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        product.availability
                          ? "bg-green-100 text-green-700"
                          : "text-red-600 "
                      }`}
                    >
                      {product.availability ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate("/admin/items/edit" , {state:product})} // navigate hook used to go to edit page  
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.key)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      <FaTrashAlt className="inline mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add New Item Button */}
      <Link to="/admin/items/add">
        <CiCirclePlus className="text-[70px] text-blue-600 absolute right-6 bottom-6 hover:text-blue-800 cursor-pointer transition" />
      </Link>
    </div>
  );
}







