const sampleArr = [
  {
    key: "AUDIO001",
    name: "Wireless Bluetooth Headphones",
    price: "129.99",
    category: "audio",
    dimensions: "18 x 15 x 7 cm",
    description: "Noise-cancelling over-ear headphones with 30 hours battery life.",
    availability: true,
    image: [
      "https://example.com/images/headphones1.jpg",
      "https://example.com/images/headphones2.jpg"
    ]
  },
  {
    key: "LIGHTS001",
    name: "Smart LED Strip Light",
    price: "39.99",
    category: "lights",
    dimensions: "5 meters",
    description: "RGB smart LED strip with remote and mobile app control.",
    availability: true,
    image: [
      "https://example.com/images/ledstrip1.jpg"
    ]
  },
  {
    key: "AUDIO002",
    name: "Portable Bluetooth Speaker",
    price: "59.99",
    category: "audio",
    dimensions: "20 x 10 x 10 cm",
    description: "Compact waterproof speaker with deep bass and 12h playtime.",
    availability: true,
    image: [
      "https://example.com/images/speaker1.jpg",
      "https://example.com/images/speaker2.jpg"
    ]
  },
  {
    key: "LIGHTS002",
    name: "Modern Desk Lamp",
    price: "24.99",
    category: "lights",
    dimensions: "40 x 15 x 15 cm",
    description: "Adjustable LED desk lamp with 3 brightness levels.",
    availability: true,
    image: [
      "https://example.com/images/desk-lamp.jpg"
    ]
  },
  {
    key: "AUDIO003",
    name: "Studio Microphone",
    price: "99.99",
    category: "audio",
    dimensions: "25 x 12 x 8 cm",
    description: "Professional USB condenser microphone for streaming and recording.",
    availability: true,
    image: [
      "https://example.com/images/microphone.jpg"
    ]
  }
];




import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage(){
    const [items, setItems] = useState(sampleArr); // Using sample data for demonstration


    return (
      <div className="w-full h-full relative">
        <table>
          <thead>
            <th>Key</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Dimensions</th>
            <th>Availability</th>
          </thead>
          <tbody>
            {items.map((product) => {
              console.log(product);
              return (
                <tr key={product.key}>
                  <td>{product.key}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.dimensions}</td>
                  <td>{product.availability ? "Available" : "Unavailable"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/admin/items/add">
          <CiCirclePlus className="text-[70px] absolute right-2 bottom-2 hover:text-red-900 cursor-pointer" />
        </Link>
      </div>
    );
}