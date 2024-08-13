import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./SliderCarousel.css";
import  auth  from "../Firebase/FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const getSliderWidth = () => {
  if (window.innerWidth >= 1600) return '70%';
  else if (window.innerWidth >= 1400 && window.innerWidth < 1600) return '80%';
  else if (window.innerWidth >= 1200 && window.innerWidth < 1400) return '85%';
  else return '70%';
};

const getSlidesCount = () => {
  if(window.innerWidth >= 720 && window.innerWidth < 1000) return 2;
  else return 3;
}

const getCenterModeValue = () => {
  if(window.innerWidth < 1000) return false;
  else return true;
}

const SliderCarousel = () => {
  const [SliderWidth, setSliderWidth] = useState(getSliderWidth);
  const [SlidesCount, setSlidesCount] = useState(getSlidesCount);
  const [centerModeValue, setCenterModeValue] = useState(getCenterModeValue);
  const [imageData, setImageData] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();


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
      setCenterModeValue(getCenterModeValue);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if(user) {
        setAuthUser(user);
      }
      else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    }
  }, [])

  const settings = {
    className: "center",
    centerMode: centerModeValue,
    infinite: true,
    slidesToShow: SlidesCount,
    speed: 500
  };

  const userSignOut = () => {
    signOut(auth).then(()=>{
      navigate("/login");
    }).catch(error => console.log(error));
  }

  return (
    <Box sx={{backgroundColor: '#000', height: '100vh'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{width: SliderWidth}}>
        <Slider {...settings}>
        {imageData.map((data, index) => (
          <div
            key={index}
            className = "slides"
          > 
            <Box
              sx={{
                borderRadius: '25px',
                border: "10px solid white",
                overflow: "hidden",
                height: '300px'
              }}
            >
              <img
                src={data.urls.small}
                alt="Profile"
                style={{ height: "100%", width: "100%", objectFit: "cover"}}
              />
            </Box>
          </div>
        ))}
        </Slider>
        </Box>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Button
                type="submit"
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  textTransform: "none",
                  borderRadius: "10px",
                  padding: '1rem 4rem',
                  fontWeight: '900',
                  fontSize: '1.3rem',
                  background: "linear-gradient(to right, #D05DB8, #6E62E5)",
                  "&:hover": {
                    background: "linear-gradient(to right, #D05DB8, #6E62E5)",
                  },
                }}
                onClick={userSignOut}
              >
                LogOut
        </Button>
      </Box>
    </Box>
  
  );
};

export default SliderCarousel;
