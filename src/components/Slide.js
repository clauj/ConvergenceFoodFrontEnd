import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Food from "../assets/food.png";

const Slide = () => {
  return (
    <div>
      <Splide
        options={{
          rewind: true,
          width: 1366,
          height: 250,
          gap: "1rem",
        }}
      >
        <SplideSlide>
          <img src={Food} alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src={Food} alt="Image 2" />
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Slide;
