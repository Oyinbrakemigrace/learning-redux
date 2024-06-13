import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";

function Details() {
  const params = useParams();
  const { data: movieDetails } = useFetchDetails(
    `/${params?.explore}/${params?.id}`
  );
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params.id}/credits`
  );
  const imageUrl = useSelector((state) => state.gboxData.imageUrl);
  console.log('data', movieDetails);
  const duration = (Number(movieDetails?.runtime) / 60)
    .toFixed(1)
    .split(".")

  return (
    <div>
      <div className="w-full h-[250px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageUrl + movieDetails?.backdrop_path}
            alt="backDrop"
            className="h-full object-cover w-full"
          />
        </div>
        <div className="absolute bg-gradient-to-t from-neutral-900/90 to-transparent w-full h-full top-0"></div>
      </div>
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="lg:-mt-28 lg:mx-0 relative mx-auto w-fit">
          <img
            src={imageUrl + movieDetails?.poster_path}
            alt="backDrop"
            className="h-80 object-cover w-60"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {movieDetails?.title || movieDetails?.name}
          </h2>
          <p className="text-neutral-400">{movieDetails?.tagline}</p>
          <p>Rating: {Number(movieDetails?.vote_average).toFixed(1)}</p>
          <p>Views: {Number(movieDetails?.vote_count)}</p>
          <p>Duration: {duration[0]}h {duration[1]}m</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
