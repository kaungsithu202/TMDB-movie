import React from "react";
import { base_url } from "../utils/tmdbApi";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import ImageLoading from "./ImageLoading";
const MoviesCarousel = ({ movieData, error, isError, loading, title }) => {
  const navigate = useNavigate();
  // if (loading) return <p className='absolute inset-0 w-full h-full'>Loading...</p>;
  // if (error) return console.log(error.message);

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };
  console.log(movieData);
  return (
    <div
      className="flex flex-wrap items-center flex-1"
      style={{
        background: "linear-gradient(90deg, #b6b6b6ff 0%, #7a7afcff 51%)",
      }}
    >
      <h1 className="mt-8 ml-5 font-mono text-3xl antialiased uppercase text-sky-900 sm:text-5xl text-start">
        {title}
      </h1>
      <Swiper
        spaceBetween={100}
        slidesPerView={6}
        modules={[Navigation, EffectFade]}
        breakpoints={{
          400: {
            width: 400,
            slidesPerView: 1,
          },
          500: {
            width: 500,
            slidesPerView: 2,
          },
          640: {
            width: 640,
            slidesPerView: 3,
          },

          768: {
            width: 768,
            slidesPerView: 4,
          },
        }}
      >
        {movieData?.data.results.map((md) => (
          <SwiperSlide key={md.id}>
            <div className="flex justify-center px-3 pb-32 mb-14 sm:inline-block">
              <div
                className="relative z-10 flex flex-wrap object-top w-64 h-32 px-2 pb-3 my-5 transition duration-500 ease-in-out rounded-lg sm:w-48 hover:cursor-pointer hover:scale-90"
                onClick={() => handleClick(md.id)}
              >
                <ImageLoading baseUrl={base_url} poster={md.poster_path} />
                {/* <img
                  className='z-10 object-top my-5 transition duration-500 ease-in-out rounded-lg hover:cursor-pointer hover:scale-90 '
                  src={`${base_url}${md.poster_path}`}
                  alt='no img'
                  onClick={() => handleClick(md.id)}
                /> */}
                <p className="  text-white absolute top-[16rem] pb-4 pt-2  ">{md.title}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesCarousel;
