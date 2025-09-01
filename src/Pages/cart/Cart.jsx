import { useState } from "react";
import { Trash } from "lucide-react";
import img2 from "../../assets/Home/shirt.png";
import img3 from "../../assets/Home/shirt1.png";

const initialProducts = [
  {
    id: 1,
    name: "Urban Rebel",
    description: "Premium Cotton T-Shirt for Men & Women with Bold Streetwear Vibes™",
    brand: "Nike",
    color: "Black",
    endDate: "Agu 25th: Black",
    discount: "50% OFF",
    image: img2,
    quantity: 1, // default quantity
  },
  {
    id: 2,
    name: "Urban Rebel",
    description: "Premium Cotton T-Shirt for Men & Women with Bold Streetwear Vibes™",
    brand: "Nike",
    color: "Black",
    endDate: "Agu 25th: Black",
    discount: "50% OFF",
    image: img3,
    quantity: 1,
  },
  {
    id: 3,
    name: "Urban Rebel",
    description: "Premium Cotton T-Shirt for Men & Women with Bold Streetwear Vibes™",
    brand: "Nike",
    color: "Black",
    endDate: "Agu 25th: Black",
    discount: "10% OFF",
    image: img2,
    quantity: 1,
  },
];

const Cart = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleQuantityChange = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, p.quantity + delta) } // quantity minimum 1
          : p
      )
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <main className="py-8">
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="flex items-center gap-6 p-6">
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Discount Badge */}
                  <span className="absolute -top-2 -right-2 bg-primary hover:bg-red-600 text-white font-semibold px-2 py-1 text-xs rounded">
                    {product.discount}
                  </span>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Brand Name:</span>
                      <span className="text-gray-600">{product.brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Family Color:</span>
                      <span className="text-gray-600">{product.color}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Ends At:</span>
                      <span className="text-gray-600">{product.endDate}</span>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2">{product.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <Trash className="ml-4 text-gray-700 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Cart;
