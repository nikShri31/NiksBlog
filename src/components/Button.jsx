import React from "react";

export default function Button(
    {
        children,      // childern kuch bhi ho skta h text ya no. ya koi value so don't forget it
        type = "button",
        bgColor = "bg-blue-600",
        textColor = "text-white",
        className = "",
        ...props       // agr koi user additional property deta h toh vo props m as it is copy ho jayegi
    }
) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}