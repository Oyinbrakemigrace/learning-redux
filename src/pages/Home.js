import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScroll from "../components/HorizontalScroll";
import useFetch from "../hooks/useFetch";

function Home() {
  const trendingMovie = useSelector((state) => state.gboxData.bannerData);
  const { data: nowPlayingMovie } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularShowData } = useFetch("/tv/popular");
  const { data: onAirData } = useFetch("/tv/on_the_air");

  return (
    <div>
      <BannerHome />
      <HorizontalScroll
        data={trendingMovie}
        heading={"Trending Shows"}
        isTrending={true}
      />
      <HorizontalScroll data={nowPlayingMovie} heading={"Now Playing"} />
      <HorizontalScroll data={topRatedData} heading={"Top Rated"} />
      <HorizontalScroll data={popularShowData} heading={"Popular TV Show"} />
      <HorizontalScroll data={onAirData} heading={"On The Air"} />
    </div>
  );
}

export default Home;
