import React from "react";

interface SideNavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export const SideNavButton: React.FC<SideNavButtonProps> = ({
  icon,
  label,
  isActive = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        group relative flex items-center justify-center
        w-12 h-12 rounded-xl
        transition-all duration-200 ease-in-out
        hover:bg-green-50
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        ${
          isActive
            ? "bg-green-100 text-green-600"
            : "text-gray-500 hover:text-green-600"
        }
        ${className}
      `}
      {...props}
    >
      {/* Icon Wrapper */}
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>

      {/* Tooltip */}
      <span
        className="
          absolute left-14 
          px-2 py-1 
          bg-gray-800 text-white text-xs font-medium rounded 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-200
          whitespace-nowrap z-50
          pointer-events-none
        "
      >
        {label}
      </span>
    </button>
  );
};