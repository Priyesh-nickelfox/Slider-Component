import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./SliderCarousel.css";
import SliderData from "./SliderData/SliderData";

const getSlidesToShow = () => {
  if (window.innerWidth > 1024) return 3;
  else if (window.innerWidth <= 1024 && window.innerWidth >= 700) return 2;
  else return 1;
};

const SliderCarousel = () => {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow);

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <Box>
      <Slider {...settings}>
        {SliderData.map((data, index) => (
          <Box
            key={index}
          > 
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#4070F4",
                borderTopRightRadius: "25px",
                borderTopLeftRadius: "25px",
                padding: "30px 0px",
                border: "10px solid white",
              }}
            >
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxivAs4UknzmDfLBXGMxQkayiZDhR2ftB4jcIV7LEnIEStiUyMygioZnbLXCAND-I_xWQpVp0jv-dv9NVNbuKn4sNpXYtLIJk2-IOdWQNpC2Ldapnljifu0pnQqAWU848Ja4lT9ugQex-nwECEh3a96GXwiRXlnGEE6FFF_tKm66IGe3fzmLaVIoNL/s1600/img_avatar.png"
                alt="Profile"
                style={{ borderRadius: "50%", height: "200px", width: "200px" }}
              />
            </Box>
            <Box
              sx={{
                borderBottomLeftRadius: "25px",
                borderBottomRightRadius: "25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "25px 15px",
                gap: "10px",
                backgroundColor: "white",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "900" }}>
                {data.name}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {data.about}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  padding: "10px",
                  fontSize: "18px",
                  fontWeight: "900",
                  marginTop: "30px",
                  width: '50%',
                  cursor: 'pointer'
                }}
              >
                View More
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderCarousel;
