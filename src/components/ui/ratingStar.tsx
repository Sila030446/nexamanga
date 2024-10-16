"use client";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Adjust according to your import structure

// Define the props interface for the RatingStar component
interface RatingStarProps {
  className?: string; // Optional className prop for custom styling
  initialRating?: number; // Average rating between 0 and 10
  onRatingChange?: (rating: number) => void; // Callback function when the rating changes
  disabled?: boolean; // New prop to disable the component
}

const stars = [1, 2, 3, 4, 5]; // Define the number of stars

const RatingStar: React.FC<RatingStarProps> = ({
  className,
  initialRating = 0,
  onRatingChange,
  disabled = false, // Default disabled prop to false
}) => {
  const [rating, setRating] = useState<number>(initialRating / 2); // Convert average rating to star rating (0-5)

  const handleMouseEnter = (value: number) => {
    if (!disabled) {
      setRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setRating(initialRating / 2); // Reset to original rating on mouse leave
    }
  };

  const handleClick = (value: number) => {
    if (!disabled) {
      const newRating = value * 2; // Convert back to average rating (0-10)
      setRating(value);
      if (onRatingChange) {
        onRatingChange(newRating); // Call onRatingChange with average rating
      }
    }
  };

  return (
    <div className="flex">
      {stars.map((star) => (
        <div
          key={star}
          className={`cursor-pointer ${disabled ? "pointer-events-none " : ""}`} // Disable pointer events and add opacity
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
        >
          <svg
            className={cn(
              "h-6 w-6",
              {
                "text-yellow-500": rating >= star, // Full star
                "text-gray-300": rating < star, // Empty star
                "text-yellow-300": rating === star - 0.5, // Half star
              },
              className
            )} // Apply className correctly here
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.188-6.038 5.52 1.427 8.213L12 18.897l-7.389 3.874 1.427-8.213-6.038-5.52 8.332-1.188L12 .587z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default RatingStar;
