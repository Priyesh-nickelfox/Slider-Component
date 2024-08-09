import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./SliderCarousel.css";
import SliderData from "./SliderData/SliderData";

const getSliderWidth = () => {
  if (window.innerWidth >= 1600) return '70%';
  else if (window.innerWidth >= 1400 && window.innerWidth < 1600) return '80%';
  else if (window.innerWidth >= 1200 && window.innerWidth < 1400) return '75%';
  else return '70%';
};

const getSlidesCount = () => {
  if(window.innerWidth >= 720 && window.innerWidth < 1000) return 1;
  if(window.innerWidth >= 1000 && window.innerWidth < 1200) return 2;
  else return 3;
}

const SliderCarousel = () => {
  const [SliderWidth, setSliderWidth] = useState(getSliderWidth);
  const [SlidesCount, setSlidesCount] = useState(getSlidesCount);
  const [imageData, setImageData] = useState([]);

  useEffect(()=>{
    const getData = async () => {
      try {
        const result = await fetch('https://api.unsplash.com/photos/?client_id=9tyulxcUoSfxvEyjN4hwwUwflt5_3HrpHgSCQNCxL5o');
        const data = await result.json();
        setImageData(data);
      }
      catch(error) {
        console.log(`The error is ${error}`)
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setSliderWidth(getSliderWidth);
      setSlidesCount(getSlidesCount);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: SlidesCount,
    speed: 500
  };

  return (
    <Box sx={{width: SliderWidth}}>
      <Slider {...settings}>
        {imageData.map((data, index) => (
          <Box
            key={index}
          > 
            <Box
              sx={{
                borderRadius: '25px',
                border: "10px solid white",
                overflow: "hidden",
                height: '400px'
              }}
            >
              <img
                src={data.urls.small}
                alt="Profile"
                style={{ height: "100%", width: "100%", objectFit: "cover"}}
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderCarousel;
