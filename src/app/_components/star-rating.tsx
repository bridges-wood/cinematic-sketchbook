import { Post } from '@/interfaces/post';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

type StarRatingProps = Pick<Post, 'rating'> & {
  className?: string;
};

const StarRating = ({ rating, className }: StarRatingProps) => {
  return (
    <div
      className={cn(
        'text-muted-foreground flex items-center gap-2 text-sm',
        className,
      )}
    >
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, j) => {
            const fillPercentage = Math.max(
              0,
              Math.min(100, (rating - j) * 100),
            );

            return (
              <div className="h-4 w-4" key={j}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  {/* Define the mask */}
                  <mask id={`star-mask-${j}`}>
                    <Star size={16} className="text-white" fill="white" />
                  </mask>

                  {/* Unfilled Star */}
                  <Star size={16} className="text-gray-300" />

                  {/* Filled Fraction */}
                  <rect
                    x="0"
                    y="0"
                    width={`${fillPercentage}%`}
                    height="100%"
                    fill="gold"
                    mask={`url(#star-mask-${j})`}
                  />
                </svg>
              </div>
            );
          })}
      </div>
      <span>{rating.toFixed(1)}/5.0</span>
    </div>
  );
};

export default StarRating;
