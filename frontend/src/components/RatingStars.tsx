import { Star } from "lucide-react";
import { useState } from "react";

type Props = {
  rating: number;
  onChange?: (value: number) => void;
  size?: number;
};

const RatingStars = ({ rating, onChange, size = 24 }: Props) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const isInteractive = typeof onChange === "function";
  const displayValue = hoverValue ?? rating;

  const handleClick = (value: number) => {
    if (isInteractive) onChange(value);
  };

  return (
    <div className="flex items-center gap-1 relative">
      {Array.from({ length: 5 }, (_, i) => {
        const value = i + 1;
        const fillPercent = Math.min(Math.max(displayValue - i, 0), 1) * 100;

        return (
          <div
            key={i}
            onClick={() => handleClick(value)}
            onMouseEnter={() => isInteractive && setHoverValue(value)}
            onMouseLeave={() => isInteractive && setHoverValue(null)}
            style={{ cursor: isInteractive ? "pointer" : "default" }}
            className="relative"
          >
            <Star
              size={size}
              className="text-gray-300"
              fill="none"
            />
            <Star
              size={size}
              className="text-yellow-500 absolute top-0 right-0"
              fill="currentColor"
              style={{
                clipPath: `inset(0 0 0 ${100 - fillPercent}% )`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
