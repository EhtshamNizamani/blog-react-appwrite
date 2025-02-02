import React from "react";
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
    className,
    ...props
}) => {
    return (
        <button
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} ${getHoverColor(
                bgColor
            )}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
