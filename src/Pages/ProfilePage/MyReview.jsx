import React from "react";
import { Send, Star } from "lucide-react";
import shirt from "../../assets/Home/shirt.png";
import tshirt from "../../assets/Home/shirt1.png";
import profile from "../../assets/Home/profile.png";
const MyReview = () => {
    const reviews = [
  {
    id: 1,
    name: "Cameron Williamson",
    avatar: profile,
    rating: 4,
    time: "2 mins ago",
    text: "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.",
    images: [shirt, tshirt],
  },
  {
    id: 2,
    name: "Cameron Williamson",
    avatar: profile,
    rating: 4,
    time: "2 mins ago",
    text: "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.",
    images: [shirt, tshirt],
  },
  {
    id: 3,
    name: "Courtney Henry",
    avatar: profile,
    rating: 5,
    time: "2 mins ago",
    text: "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua",
    images: [shirt, tshirt],
  },
];

const ratingBreakdown = [
  { stars: 5, count: 32, percentage: 62 },
  { stars: 4, count: 15, percentage: 29 },
  { stars: 3, count: 3, percentage: 6 },
  { stars: 2, count: 1, percentage: 2 },
  { stars: 1, count: 1, percentage: 2 },
];

// Star Rating Component
function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
  return (
    <div>
         <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center text-sm font-medium">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-500">{review.time}</span>
                </div>

                <p className="text-sm text-gray-800 leading-relaxed">
                  {review.text}
                </p>

                {review.images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.images.map((image, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-lg border overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyReview