import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";

function Home() {
  const trendingMovie = useSelector((state) => state.gboxData.bannerData);
  return (
    <div>
      <BannerHome />
      <div className="container mx-auto px-3 my-11">
        <h2 className="lg:text-2xl text-xl font-bold mb-2">Trending Shows</h2>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6">
          {trendingMovie.map((data) => {
            return <Card key={data.id} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
