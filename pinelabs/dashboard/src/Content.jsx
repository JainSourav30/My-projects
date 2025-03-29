import ActivityChart from "./components/AcitivityChart";
import CustomerSatisfactionChart from "./components/CustomerSatisfactionChart";
import { DropDown } from "./components/DropDown";
import RecentOrders from "./components/RecentOrders";
import StrongestProductsChart from "./components/StrongestProductsChart";
import TopSellingProducts from "./components/TopSellingProducts";

export default function Content(){
    return(
        <div className="flex-1 flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-100 mx-7 mt-3 border-b-2 border-gray-200 flex justify-between">
        <div className="py-3 text-[16px] font-bold">Dashboard</div>
        <div className="py-3 text-[12px] font-semibold flex items-center gap-1">
          {/* Download Icon */}
                <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25c0 .414.336.75.75.75h16.5a.75.75 
                0 00.75-.75V16.5M7.5 10.5l4.5 4.5 4.5-4.5M12 
                3.75v10.5"
            />
        </svg>

          {/* Download Text */}
          <span>Download</span>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap justify-center mt-2">
        <DropDown index="Timeframe" time="All-time" />
        <DropDown index="Transaction Type" time="All-time" />
        <DropDown index="Product" time="All" />
      </div>

      {/* Main content (fills remaining space) */}
      <div className="p-6 bg-gray-100 flex-1  overflow-auto">
        {/* TOP SECTION: Cards + ActivityChart */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Left: 2x2 Cards (col-span-2) */}
          <div className="grid grid-cols-2 gap-4 col-span-2">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Total Transactions</p>
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold">₹24.35M</h2>
              <p className="text-green-500">+35%</p>
              <button className="text-blue-500 mt-2">View Report</button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Success Rate</p>
                <span className="text-2xl">📈</span>
              </div>
              <h2 className="text-2xl font-bold">45%</h2>
              <p className="text-green-500">+15%</p>
              <button className="text-blue-500 mt-2">View Report</button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Decline Reasons</p>
                <span className="text-2xl">📄</span>
              </div>
              <h2 className="text-2xl font-bold">20%</h2>
              <p className="text-red-500">-3.5%</p>
              <button className="text-blue-500 mt-2">View More</button>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Card/UPI</p>
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold">43.5k</h2>
              <p className="text-green-500">+25%</p>
              <button className="text-blue-500 mt-2">View More</button>
            </div>
          </div>

          {/* Right: Activity Chart (col-span-2) */}
          <div className="bg-white p-4 rounded-xl shadow-md col-span-2 flex items-center justify-center">
            <div className="w-full h-64"> 
              {/* Give a fixed height (e.g., 16rem) so the chart has space */}
              <ActivityChart />
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: 2 Charts */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="w-full h-64">
              <CustomerSatisfactionChart />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center">
            <StrongestProductsChart/>
          </div>
        </div>

        {/* BOTTOM SECTION: Orders + Products */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="w-full h-full">
              <RecentOrders />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="w-full h-full">
              <TopSellingProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}