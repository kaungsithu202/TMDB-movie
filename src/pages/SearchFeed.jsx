import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_url, instance } from "../utils/tmdbApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import Error from "../components/Error";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const SearchFeed = () => {
  console.log(process.env);

  const { searchTerm } = useParams();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  console.log(searchTerm);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get(
        `/search/movie?query=${searchTerm}&page=${page}&api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
      );
      setMovies(response?.data?.results);
    };
    fetchData();
  }, [searchTerm]);

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };
  return (
    <div>
      {movies?.length === 0 ? (
        <Error title="Movie Not Found" />
      ) : (
        <Swiper spaceBetween={100} slidesPerView={6} modules={[Navigation, EffectFade]}>
          {movies?.map((md) => (
            <SwiperSlide key={md.id}>
              <div className="px-3 pb-32 my-28">
                <div className="relative w-48 h-32 px-2 pb-3 ">
                  <img
                    className="z-10 object-top my-5 transition duration-500 ease-in-out rounded-lg hover:cursor-pointer hover:scale-90 "
                    src={`${base_url}${md.poster_path}`}
                    alt="no img"
                    onClick={() => handleClick(md.id)}
                  />
                  <p className="  text-black absolute top-[16rem] pb-4 pt-2  ">{md.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SearchFeed;
