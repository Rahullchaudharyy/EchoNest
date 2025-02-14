import React, { useEffect, useState } from "react";
import { truncateText } from "../utils/TextOverflow";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./NotFound";
import { setSearching } from "../features/ConfigSlice";

function SearchComponent() {
  const { blogs } = useSelector((state) => state.blogs);
  const { IsSearching } = useSelector((state) => state.config);
  const [SearchedText, setSearchedText] = useState("");
  const [SearchedReslut, setSearchedReslut] = useState();
  const dispatch = useDispatch();

  const handleSearch = () => {
    const FillterSearch = blogs.filter(
      (data) =>
        data.title
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(SearchedText.toLowerCase().replaceAll(" ", "")) ||
        data.content
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(SearchedText.toLowerCase().replaceAll(" ", ""))
    );
    setSearchedReslut(FillterSearch);
    // console.log(FillterSearch);
  };
  //   console.log(SearchedReslut?.length)
  useEffect(() => {
    handleSearch();
  }, [SearchedText]);

  return (
    <div className="w-[100%] h-[100%] fixed top-0 z-50 left-0 bg-black/30 backdrop-blur-sm transition-all duration-300   ">
      <div className="fixed p-2 transition-all transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-[90%] w-[90%] sm:w-[750px] sm:h-[500px] rounded-md bg-white">
        <div className="flex border-b justify-center items-center gap-2 px-2">
          <button className="text-lg   text-center  flex justify-center items-center h-[40px] w-[40px] rounded-full   transition-all">
            <i className=" p-1  ri-search-line"></i>
          </button>

          <input
            onChange={(e) => setSearchedText(e.target.value)}
            value={SearchedText}
            placeholder="Search the Title"
            type="text"
            className=" h-[50px] rounded-lg p-2 relative transition-all focus:outline-none w-full"
          />
          <button
            onClick={() => dispatch(setSearching(!IsSearching))}
            className="h-[35px] w-[35px] border rounded-full"
          >
            <i className="cursor-pointer     ri-close-large-line"></i>
          </button>
        </div>
        <h1 className="h-[50px] text-[20px] font-semibold w-full text-start flex items-center border-b">
          Posts
        </h1>
        <div className="h-[400px] hide-scrollbar p-4 overflow-y-scroll w-full">
          {SearchedReslut?.length > 0 ? (
            SearchedReslut?.map((data, index) => (
              <Link key={index} to={`/blog/${data._id}`} className={`p-5 `}>
                <h1 className="text-lg font-bold">{data?.title}</h1>

                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateText(data?.content, 6),
                  }}
                ></div>
              </Link>
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              <NotFound
                message={`Can't find the Post related to '${SearchedText}...' `}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
