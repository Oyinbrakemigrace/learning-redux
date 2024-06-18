import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

function Search() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();

  const query = location?.search?.slice(3);

  const handleFetchData = async () => {
    try {
      const response = await axios.get("/search/multi", {
        params: {
          query: location?.search?.slice(3),
          page: pageNum,
        },
      });
      //console.log(response.data.results);
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      //setTotalPageNum(response.data.total_pages);
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
    setData([]);
    handleFetchData();
  }, [location.search]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="lg:hidden my-4 mx-3 sticky top-20 z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-2 text-lg w-full bg-white rounded-full text-neutral-900"
          value={query?.split("%20")?.join("")}
        />
      </div>
      <div className="container mx-auto">
        <h2 className="capitalize text-lg lg:text-xl font-semibold my-5">
          Search Results
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + "searchData" + index}
                mediaType={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
