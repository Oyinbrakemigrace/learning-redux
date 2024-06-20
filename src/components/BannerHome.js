import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BannerHome() {
  const bannerData = useSelector((state) => state.gboxData.bannerData);
  const imageUrl = useSelector((state) => state.gboxData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };


   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentImage((prevImage) => (prevImage + 1) % bannerData.length);
     }, 5000);

     return () => clearInterval(interval);
   }, [bannerData]);
  //console.log(bannerData);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          return (
            <div
              key={data.id}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full lg:h-auto lg:w-auto">
                <img
                  src={imageUrl + data.backdrop_path}
                  alt="movieImage"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute top-0 h-full w-full hidden items-center justify-between px-4 group-hover:lg:flex">
                <button
                  onClick={handlePrevious}
                  className="bg-white z-10 p-1 text-black rounded-full"
                >
                  <FaAngleLeft size={25} />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white z-10 p-1 text-black rounded-full"
                >
                  <FaAngleRight size={25} />
                </button>
              </div>
              <div className="absolute top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto">
                <div className="absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data?.title || data?.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Ratings: {Number(data?.vote_average).toFixed(1)} +</p>
                    <span>|</span>
                    <p>Views : {Number(data?.popularity.toFixed(0))}</p>
                  </div>
                  <Link to={"/" + data.media_type + "/" + data.id}>
                    <button className="bg-white font-bold px-4 py-2 my-5 mt-4 rounded text-black hover:bg-gold shadow-md transition-all hover:scale-105">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BannerHome;
