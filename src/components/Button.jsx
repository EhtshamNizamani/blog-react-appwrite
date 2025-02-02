import React from "react";
import { BeatLoader } from 'react-spinners';

const getHoverColor = (bgColor) => {
    const colorMap = {
        "bg-blue-600": "hover:bg-blue-700",
        "bg-red-600": "hover:bg-red-700",
        "bg-green-600": "hover:bg-green-700",
        "bg-yellow-600": "hover:bg-yellow-700",
        "bg-gray-600": "hover:bg-gray-700",
    };

    return colorMap[bgColor] || "hover:brightness-90"; // Default fallback
};

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    isLoading = false,
    className,
    ...props
}) => {
    return (
        <button
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} ${getHoverColor(
                bgColor
            )}`}
            {...props}
        >
            {isLoading && (
                <div className="relative h-0  -translate-1/2"> {/* Position the spinner */}
                    <BeatLoader color="white" size={8} />
                </div>
            )}
            <span className={`${isLoading ? 'opacity-0' : ''}`}> {/* Hide text while loading */}
                {children}
            </span>
        </button>
    );
};

export default Button;
