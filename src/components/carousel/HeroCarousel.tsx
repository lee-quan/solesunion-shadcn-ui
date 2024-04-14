import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./css/HeroCarousel.css";
import { CLOUDFLARE_URL } from "@/lib/constants";

const images = [
  "/image/solesunion_store_1.jpeg",
  "/image/solesunion_store_2.jpeg",
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: "auto",
    },
    [Autoplay()]
  );

  return (
    <div className="hero__carousel">
      <div className="hero__carousel__viewport" ref={emblaRef}>
        <div className="hero__carousel__container">
          {images.map((image, index) => (
            <div className="hero__carousel__slide" key={index}>
              <div className="hero__carousel__slide__number">
                <div className="flex-col items-center">
                  <img src={image} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
