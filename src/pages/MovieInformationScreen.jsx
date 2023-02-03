import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail, base_url } from "../utils/tmdbApi";
import { useQuery } from "@tanstack/react-query";

import Cast from "../components/Cast";
import PreviewModal from "../components/PreviewModal";

const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [backdrop, setBackdrop] = useState(true);

  const { isLoading, isError, error, data: detail } = useQuery(["movieDetail", id], () => getMovieDetail(id));

  // if (isLoading) return <p className='absolute inset-0 w-full h-full'>Loading...</p>;
  if (isLoading) return <p className="absolute inset-0 w-full h-full">Loading...</p>;

  const getMovieTrailerVideoKey = (videosList) => {
    if (videosList && videosList.length > 0) {
      const trailers = videosList.filter(({ type, official }) => type.toLowerCase() === "trailer" && official);
      return trailers.length > 0 ? trailers.at(-1).key : videosList.at(-1).key;
    }
    return null;
  };

  const trailerKey = getMovieTrailerVideoKey(detail?.data?.videos?.results);
  console.log(trailerKey);

  const goToProfile = (castId) => {
    navigate(`/profile/${castId}`);
  };
  const backdropHandler = () => {
    setBackdrop(!backdrop);
  };
  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12" key={detail?.data?.id}>
      <div className="py-3 sm:max-w-4xl sm:mx-auto">
        <div className="bg-white relative shadow-lg border-gray-100 min-h-[500px] border  sm:rounded-3xl flex flex-col md:flex-row justify-between">
          <div className=" overflow-visible w-full  md:w-[45%] p-1 bg-center">
            <img
              className="object-cover w-full h-full bg-center shadow-lg rounded-l-2xl"
              src={`${base_url}${detail?.data?.poster_path}`}
              alt="movies cover"
            />
          </div>
          <div
            id="defaultModal"
            tabindex="-1"
            aria-hidden="true"
            className={`${
              backdrop ? "hidden" : " "
            } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
          >
            {/* Modal */}
            <PreviewModal backdropHandler={backdropHandler} trailerKey={trailerKey} backdrop={backdrop} />
          </div>

          <div className="flex flex-col w-full md:w-[50%] p-6 rounded-md">
            <div className="flex ">
              <h2 className="font-sans text-2xl font-bold ">{detail?.data?.title}</h2>

              <div className="p-2 ml-auto font-bold bg-yellow-400 rounded-xl">
                {Math.ceil(detail?.data?.vote_average).toFixed(1)}
              </div>
            </div>

            <div className="items-center justify-between text-lg ">
              <p className="mt-2 italic font-bold">{detail?.data?.release_date.split("-").slice(0, 1)}</p>
              <button
                className="p-2 my-3 mr-6 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-700 hover:duration-200 hover:transition-all"
                data-modal-toggle="defaultModal"
                onClick={backdropHandler}
              >
                Preview
              </button>
              <p className=" text-gray-400 h-[200px] overflow-y-auto">{detail?.data?.overview} </p>
              <button
                onClick={() => navigate(-1)}
                className="absolute bottom-[50px] right-[100px] text-blue-500 hover:text-red-500 cursor-pointer"
              >
                &laquo; Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        <div className="hidden md:flex">
          <Cast castData={detail?.data?.credits?.cast} profileHandler={goToProfile} baseUrl={base_url} />
        </div>
      </div>
    </div>
  );
};

export default TestDetail;
