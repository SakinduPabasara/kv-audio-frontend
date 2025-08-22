export default function ProductCard(props) { 
    const item = props.item; 
    return(
        <div className="bg-white rounded-lg shadow-md p-6 m-4 w-80 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
                <img 
                    src={item.image[0]} 
                    alt={item.name}
                    className="w-48 h-48 object-cover rounded-full"
                />
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-3 capitalize">{item.category}</p>
            
            <p className="text-sm text-gray-700 mb-4">{item.description}</p>
            
            <div className="flex justify-between items-center mb-3">
                <p className="text-2xl font-semibold text-green-600">{item.price}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.availability 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {item.availability ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Dimensions:</span> {item.dimensions}
            </p>
            
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                View Details
            </button>
        </div>
    ) 
}