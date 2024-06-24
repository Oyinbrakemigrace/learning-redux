import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import useFetch from "../hooks/useFetch";
import HorizontalScroll from "../components/HorizontalScroll";
import VideoPlay from "../components/VideoPlay";

function Details() {
  const params = useParams();
  
  const { data: movieDetails } = useFetchDetails(
    `/${params?.explore}/${params?.id}`
  );
  //console.log("params", movieDetails);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params.id}/credits`
  );
  const imageUrl = useSelector((state) => state.gboxData.imageUrl);
  //console.log('data', movieDetails);
  const duration = (movieDetails?.runtime / 60).toFixed(1).split(".");

  const { data: similarData } = useFetch(
    `/${params?.explore}/${params.id}/similar`
  );
  const { data: recommendedData } = useFetch(
    `/${params?.explore}/${params.id}/recommendations`
  );
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoID, setPlayVideoID] = useState("");

  const handlePlayVideo=(data)=>{
    setPlayVideoID(data)
    setPlayVideo(true)
  }

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
        <div className="lg:-mt-28 lg:mx-0 relative mx-auto w-fit min-w-60 ">
          <img
            src={imageUrl + movieDetails?.poster_path}
            alt="backDrop"
            className="h-80 object-cover w-60 rounded"
          />
          <button
            onClick={() => handlePlayVideo(movieDetails)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gold hover:scale-105 transition-all"
          >
            Play Trailer
          </button>
        </div>
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {movieDetails?.title || movieDetails?.name}
          </h2>
          <p className="text-neutral-400 italic">{movieDetails?.tagline}</p>
          <p>Rating: {Number(movieDetails?.vote_average).toFixed(1)}</p>
          <p>Views: {Number(movieDetails?.vote_count)}</p>
          {params?.explore === "movie" && (
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          )}

          <div>
            <h3 className="text-xl font-bold text-white mb-1 mt-5">
              Overview:
            </h3>
            <p>{movieDetails?.overview}</p>
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status : {movieDetails?.status}</p>
              <span>|</span>
              <p>
                Release Date:{" "}
                {moment(movieDetails?.release_date).format("MMMM Do YYYY")}
              </p>
              {params?.explore === "movie" && (
                <>
                  <span>|</span>
                  <p>Revenue: {Number(movieDetails?.revenue)}</p>
                </>
              )}
            </div>
          </div>
          <div>
            <p>
              <span className="text-white">Director : </span>
              {castData?.crew[0]?.name}
            </p>
          </div>
          <div className="my-3">
            <h3 className="font-bold text-lg">Casts:</h3>
            <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
              {castData?.cast
                ?.filter((el) => el?.profile_path)
                .map((starCast, index) => {
                  return (
                    <div key={starCast.id + "starCast" + index}>
                      <div>
                        <img
                          src={imageUrl + starCast?.profile_path}
                          alt=""
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-center text-sm">
                        {starCast?.name}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <HorizontalScroll
          data={similarData}
          heading={`Similar ${
            params?.explore === "movie" ? "Movies" : "TV Shows"
          }`}
          mediaType={params?.explore}
        />
      </div>
      <div>
        <HorizontalScroll
          data={recommendedData}
          heading={`Recommended ${
            params?.explore === "movie" ? "Movies" : "TV Shows"
          }`}
          mediaType={params?.explore}
        />
      </div>
      {playVideo && (
        <VideoPlay
          data={playVideoID}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
}

export default Details;
