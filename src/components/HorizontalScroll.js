import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function HorizontalScroll({ data = [], heading, isTrending, mediaType }) {
  const containerRef = useRef();
  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };
  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-3 my-11">
      <h2 className="lg:text-2xl text-xl font-bold mb-3 text-white">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar"
        >
          {data.map((d, index) => {
            return (
              <Card
                key={d.id + "heading" + index}
                data={d}
                index={index + 1}
                isTrending={isTrending}
                mediaType={mediaType}
              />
            );
          })}
        </div>
        <div className="hidden absolute top-0 lg:flex justify-between items-center h-full w-full">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -ml-1 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HorizontalScroll;
