import React, { Children } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OaksSlider = ({ children, slideDefault, break1, break2, break3 }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slideDefault,
    slidesToScroll: 1,
    centerPadding: "60px",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          swipeToSlide: true,
          slidesToShow: break1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: break2,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: break3,
          swipeToSlide: true,
          // centerMode: true,
          // centerPadding: "40px",
        },
      },
    ],
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default OaksSlider;
