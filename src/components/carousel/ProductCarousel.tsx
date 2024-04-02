import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./css/ProductCarousel.css";
import { CLOUDFLARE_URL } from "@/lib/constants";

const images = [
    "https://static.wixstatic.com/media/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_a80d9b61cde14bd980621a88a97033b6~mv2.webp",
    "https://static.wixstatic.com/media/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.jpg/v1/fill/w_708,h_944,q_90/e4745c_86da12ba0fc744a9948164d3a2f9e393~mv2.webp",
];

export default function ProductCarousel({
    section,
}: {
    section: {
        section_name: string;
        products: {
            product_title: string;
            slug: string;
            image: {
                image_file: string;
            };
            lowest_active_offer: {
                offer_price: number | string;
            };
        }[];
    };
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            dragFree: true,
            slidesToScroll: "auto",
        },
        [Autoplay()]
    );

    return (
        <section className="w-full px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {section.section_name}
            </h2>
            <div className="product__carousel">
                <div className="product__carousel__viewport" ref={emblaRef}>
                    <div className="product__carousel__container">
                        {section.products.map((product, index) => (
                            <a
                                className="product__carousel__slide"
                                key={index}
                                href={product.slug}
                            >
                                <div className="product__carousel__slide__number">
                                    <div className="flex-col items-center">
                                        <img
                                            src={`${CLOUDFLARE_URL}/${product.image.image_file}/public`}
                                        />
                                        <p className="text-xs text-center">
                                            {product.product_title}
                                        </p>
                                        <p className="text-xs text-center">
                                            RM{" "}
                                            {
                                                product.lowest_active_offer
                                                    .offer_price
                                            }
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
