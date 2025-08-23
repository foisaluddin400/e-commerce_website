import React from 'react'
import { Link } from 'react-router-dom'

const GetPrice = () => {
  return (
     <div className="  flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-xl text-gray-600 font-medium">
          What do you want to do with your design?
        </h1>

        {/* Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <div className="pb-4 px-4 pt-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Buy & Ship</h2>
          </div>
          <div className="px-4 py-6 space-y-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              Enter your order details and ship to one or multiple addresses right away. You can also collect sizes,
              addresses, and payments from your group.
            </p>

           
          </div>
        </div>
         <Link to={'/allProduct/productDetails/design/getPrice/chooseOrder'}><button className="w-full bg-primary hover:bg-red-600 text-white font-medium py-2 rounded">
              Continue
            </button></Link>
      </div>
    </div>
  )
}

export default GetPrice