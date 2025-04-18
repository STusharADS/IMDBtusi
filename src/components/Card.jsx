import React, { useContext } from "react";
import "./Card.css";
import { MovieContext } from "../context/MovieContext.jsx";
function Card({ mov }) {
  let {handleAddToWatchList}=useContext(MovieContext)
  return (
    <div className="w-[180px] h-fit flex flex-col items-center mb-2">
      <div
        className="w-[140px] h-[210px] bg-contain hover:scale-105"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${mov.poster_path})`,
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      ></div>
      <div onClick={()=>{handleAddToWatchList(mov); console.log("used");}} className=" h-8 w-8 flex justify-center items-center rounded-lg bg-yellow-900/60 hover:cursor-pointer hover:scale-105">&#128525;</div>
      <div>{mov.title}</div>
    </div>
  );
}

export default Card;
