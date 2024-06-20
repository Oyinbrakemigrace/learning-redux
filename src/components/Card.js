import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Card({ data, isTrending, index, mediaType }) {
  //console.log('data', data);
  const imageUrl = useSelector((state) => state.gboxData.imageUrl);
  const typeOfMedia = data.media_type ?? mediaType
  return (
    <Link
      to={"/" + typeOfMedia + "/" + data.id}
      className="min-w-[230px] max-w-[230px] w-full h-80 overflow-hidden rounded block relative hover:scale-105 transition-all "
    >
      {
        data?.poster_path ? (
          <img src={imageUrl + data?.poster_path} alt="posterImage" />
        ):(
          <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
            No Image Found
          </div>
        )
      }
      <div className="absolute top-4 ">
        {isTrending && (
          <div className="px-4 bg-deep-navy/55 overflow-hidden backdrop-blur-3xl rounded-r-full">
            #{index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-16  backdrop-blur-3xl w-full bg-gold/85 text-deep-navy p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-xs text-deep-navy flex justify-between items-center">
          <p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-deep-navy rounded-full text-xs text-white px-1">
            Rating {Number(data?.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;