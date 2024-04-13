import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./css/CustomerCarousel.css";

const images = [
    "https://static.wixstatic.com/media/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.webp",
];

export default function CustomerCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            dragFree: true,
            loop: true,
            slidesToScroll: "auto",
        },
        [Autoplay()]
    );

    return (
        <section className="customer__carousel">
            <div className="customer__carousel__viewport" ref={emblaRef}>
                <div className="customer__carousel__container">
                    {images.map((image, index) => (
                        <div className="customer__carousel__slide" key={index}>
                            <div className="customer__carousel__slide__number">
                                <img src={image} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
