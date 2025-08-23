import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ChooseOrder = () => {
      const [shipping, setShipping] = useState("single"); 
  const [sizes, setSizes] = useState("know-sizes"); 
  const [payment, setPayment] = useState("pay-all"); 

  const handleContinue = () => {
    console.log("Order options:", { shipping, sizes, payment });
   
  };

  const optionCardClass = (selected) =>
    `p-4 cursor-pointer transition-all border-2 rounded-lg text-center ${
      selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
    }`;
  return (
    <div>
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        Choose Your Order Options
      </h1>

      <div className="space-y-8">
        {/* Shipping Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">1. Shipping</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={optionCardClass(shipping === "single")} onClick={() => setShipping("single")}>
              <p className="font-medium text-gray-800">Ship to single address</p>
            </div>
            <div className={optionCardClass(shipping === "multiple")} onClick={() => setShipping("multiple")}>
              <p className="font-medium text-gray-800">Ship to multiple address</p>
            </div>
          </div>
        </div>

        {/* Sizes Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">2. Sizes and Quantities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={optionCardClass(sizes === "know-sizes")} onClick={() => setSizes("know-sizes")}>
              <p className="font-medium text-gray-800">I Know Sizes I need</p>
            </div>
            <div className={optionCardClass(sizes === "group-choice")} onClick={() => setSizes("group-choice")}>
              <p className="font-medium text-gray-800">Invite my group to choose their size</p>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">3. Payment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={optionCardClass(payment === "pay-all")} onClick={() => setPayment("pay-all")}>
              <p className="font-medium text-gray-800">I will pay for the entire order</p>
            </div>
            <div className={optionCardClass(payment === "group-pay")} onClick={() => setPayment("group-pay")}>
              <p className="font-medium text-gray-800">Invite my group to pay for their order</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
         <Link to={'/allProduct/productDetails/design/getPrice/chooseOrder/orderSummery'}> <button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-red-600 text-white py-2 text-lg font-medium rounded"
          >
            Continue
          </button></Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChooseOrder