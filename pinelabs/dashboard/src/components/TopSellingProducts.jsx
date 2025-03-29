import React from "react";

// Utility to display 5-star ratings
const StarRating = ({ rating }) => {
  // We assume rating is an integer 0-5
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
};

const TopSellingProducts = () => {
  const products = [
    {
      name: "NIKE Shoes Black Pattern",
      rating: 5,
      price: 1099,
      imageUrl:
        "https://www.shutterstock.com/image-vector/penang-malaysia-4-desember-2023-260nw-2396831997.jpg", // Example placeholder
    },
    {
      name: "iPhone 15 pro",
      rating: 4,
      price: 987,
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blue-titanium?wid=940&hei=1112&fmt=png-alpha&.v=1693591692224", // Example placeholder
    },
  ];

  return (
    <div className="w-full h-full text-gray-700 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-600 font-bold text-base">Top Selling Products</h2>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.name} className="flex items-start space-x-3">
            {/* Product Image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />

            {/* Product Details */}
            <div>
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <StarRating rating={product.rating} />
              <p className="text-gray-600 mt-1 font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;