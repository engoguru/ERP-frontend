import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  title,
  description,
  price,
  category,
  popular,
  icon,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        group relative
        bg-white
        rounded-xl
        p-6
        border border-gray-300
        hover:border-[hsl(168_76%_42%)]
        transition-all duration-300
        cursor-pointer
        ${className || ""}
      `}
    >
      {popular && (
        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-white bg-[hsl(168_76%_42%)] text-accent-foreground text-xs font-medium">
          Popular
        </div>
      )}

      {category && (
        <span className="block px-2.5 py-1 rounded-md text-xs font-medium mb-4 text-left bg-gray-300">
          {category}
        </span>
      )}

      <div className="flex items-start gap-4 mb-4">
        {icon && (
          <div className="p-3 rounded-lg text-[hsl(168_76%_42%)] hover:text-white transition-colors hover:bg-[hsl(168_76%_42%)]">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold mb-1 text-start">
            {title}
          </h3>
          <p className="text-sm text-gray-600 text-start line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-500">Starting from</span>
          <p className="text-lg font-bold">
            {price}
          </p>
        </div>
    <span className="text-sm font-medium text-[hsl(168_76%_42%)] group-hover:opacity-100 transition-opacity hover:text-white hover:bg-[hsl(168_76%_42%)] hover:p-1 hover:rounded">
  <Link to={`/serviceDetail/${1}`}>View Details →</Link>
</span>

      </div>
    </div>
  );
};


export default ServiceCard;
