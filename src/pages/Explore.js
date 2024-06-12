import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

function Explore() {
  const params = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
  //console.log(params.explore);
  const handleFetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNum,
        },
      });
      //console.log(response.data.results);
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      setTotalPageNum(response.data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNum((prev) => prev + 1);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [pageNum]);

  useEffect(() => {
    setPageNum(1);
    handleFetchData();
    setData([])
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h1 className="capitalize text-lg lg:text-xl font-semibold my-5">
          Popular {params.explore}
          {params.explore === "tv" ? " shows" : "s"}
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={exploreData.id + "exploreData"}
                mediaType={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Explore;
