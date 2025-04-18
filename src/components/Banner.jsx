import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
function Banner() {
    return (
        <div
        className="h-[40svh] w-full"
        style={{
            backgroundImage: "url(https://lacountylibrary.org/wp-content/uploads/2018/07/landscape-1522924460-avengers-infinity-war-poster.jpg)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "black",
            backgroundRepeat: "no-repeat",
        }}
        >
            {/* <img className="h-[50vh] w-[100vw] bg-cover" src="https://lacountylibrary.org/wp-content/uploads/2018/07/landscape-1522924460-avengers-infinity-war-poster.jpg" alt="avengersimage" /> */}

        </div>
    );
}
export default Banner;