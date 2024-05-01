import React from "react";
import "../styles/Slide.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const images = [
  {
    label: "beach",
    src: "../../public/assets/slides/beach2.jpg",
  },
  {
    label: "luxury",
    src: "../../public/assets/slides/luxury.jpg",
  },
  {
    label: "island",
    src: "../../public/assets/slides/island1.jpg",
  },
  {
    label: "cave",
    src: "../../public/assets/slides/cave2.jpg",
  },
  {
    label: "island",
    src: "../../public/assets/slides/island2.jpg",
  },
];

const Slide = () => {
  return (
    <div className="slide">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        className="carousel"
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.label} />
            <div className="overlay"></div>
          </div>
        ))}
      </Carousel>
      <div className="banner-text">
        <h1>
          Welcome to <span>Coastal Haven!</span>
        </h1>
        <p>Find Your Perfect Stay: Your Home, Anywhere You Go</p>
      </div>
    </div>
  );
};

export default Slide;
