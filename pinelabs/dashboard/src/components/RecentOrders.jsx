import React from "react";

const RecentOrders = () => {
  const orders = [
    {
      trackingNo: "#876364",
      productName: "Camera Lens",
      price: "₹1,45,000",
      reorder: 30,
      total: "₹12,60,000",
    },
    {
      trackingNo: "#876368",
      productName: "HP laptop 15",
      price: "₹45,000",
      reorder: 28,
      total: "₹12,60,000",
    },
    {
      trackingNo: "#876412",
      productName: "Apple MacBook Pro",
      price: "₹1,59,000",
      reorder: 20,
      total: "₹31,80,000",
    },
  ];

  return (
    <div className="w-full h-full text-gray-700 text-sm">
      {/* Header row (title + "more" button) */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-600 text-base">Recent Orders</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M3 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-200">
              <th className="py-2 text-left">Tracking no</th>
              <th className="py-2 text-left">Product Name</th>
              <th className="py-2 text-left">Price</th>
              <th className="py-2 text-left">Re-order</th>
              <th className="py-2 text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.trackingNo}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-3 text-gray-600">{order.trackingNo}</td>
                <td className="py-3 text-gray-600">{order.productName}</td>
                <td className="py-3 text-gray-600">{order.price}</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {order.reorder}
                  </span>
                </td>
                <td className="py-3 text-gray-600">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;