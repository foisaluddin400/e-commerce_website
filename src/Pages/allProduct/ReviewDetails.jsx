import React from "react";
import { Send, Star } from "lucide-react";
import shirt from "../../assets/Home/shirt.png";
import tshirt from "../../assets/Home/shirt1.png";
import profile from "../../assets/Home/profile.png";

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

const testimonials = [
  {
    id: 1,
    name: "Hridoy Hossain",
    role: "UX & UI Designer",
    avatar: profile,
    rating: 5,
    review:
      "I've used other kits, but this one is the best. The attention to detail and usability are truly amazing.",
  },
  {
    id: 2,
    name: "Mojahid Leder",
    role: "UI/UX Designer",
    avatar:profile,
    rating: 5,
    review:
      "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
  },
];

// Progress Bar Component
function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-2 bg-yellow-400 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

export function ReviewDetails() {
  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="md:grid grid-cols-3 gap-6 my-11">
        <div className="flex gap-12">
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold text-gray-900 mb-2">4.0</div>
            <StarRating rating={4} size={20} />
            <div className="text-sm text-gray-500 mt-2">52 Reviews</div>
          </div>

          <div className="flex-1 space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-8">
                  <span className="text-sm">{item.stars}</span>
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                </div>
                <ProgressBar value={item.percentage} />
              </div>
            ))}
          </div>
        </div>

      
       
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6    space-y-4"
              >
                {/* Avatar + Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Rating */}

                {/* Review */}
                <p className="text-foreground leading-relaxed">
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>
 

      {/* Reviews List */}
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

      {/* Comment Input */}
      <div className="flex gap-3 pt-4">
        <input
          type="text"
          placeholder="Write a review..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button className="p-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
