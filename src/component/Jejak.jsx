import React from "react";
import { useLocation } from "react-router-dom";

const toTitleCase = (str) => {
  return str
    .replace(/%20/g, " ") // Ganti %20 dengan spasi
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const isNumeric = (str) => {
  return /^\d+$/.test(str);
};

const Jejak = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && !isNumeric(x));

  return (
    <div className="p-1">
      {pathnames.length > 0 ? (
        <nav>
          {pathnames.map((value, index) => (
            <span key={index} className="text-gray-800 border-b-2 pb-1">
              {index > 0 && " >> "}
              {toTitleCase(value.replace(/-/g, " "))}
            </span>
          ))}
        </nav>
      ) : (
        <span className="text-gray-600">Home</span>
      )}
    </div>
  );
};

export default Jejak;
