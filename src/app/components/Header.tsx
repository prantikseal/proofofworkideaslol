/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const spans = [
    { text: "Design", originalColor: "text-orange-500" },
    { text: "Marketing,", originalColor: "text-gray-500" },
    { text: "Content", originalColor: "text-gray-500" },
    { text: "Coding", originalColor: "text-gray-500" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % spans.length);
    }, 1000); // Change color every 1 second

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const getSpanClass = (index: any) => {
    const baseClasses = spans[index].className || "";
    if (activeIndex === index) {
      return `${baseClasses} text-orange-500 transition-colors duration-500`;
    } else {
      return `${baseClasses} ${spans[index].originalColor} transition-colors duration-500`;
    }
  };

  return (
    <div className="mb-12">
      <div className="w-full">
        <span className="text-xl mb-2 font-bubble w-full">Lol!</span>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">
        The funniest and the uniquest Proof of
        <br />
        Work ideas around{" "}
        {spans.slice(1).map((span, index) => (
          <React.Fragment key={index + 1}>
            <span className={getSpanClass(index + 1)}>{span.text}</span>
            {index + 1 === 2 && <br />}
            {index < spans.length - 2 && " "}
          </React.Fragment>
        ))}{" "}
        and more.
      </h1>
    </div>
  );
};

export default Header;
