import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import "./css/BestSellerCarousel.css";
import useEmblaCarousel from "embla-carousel-react";
import { cn, price } from "@/lib/utils";
import { CLOUDFLARE_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";

const OPTIONS: EmblaOptionsType = {
  axis: "y",
  align: "start",
  dragFree: true,
  slidesToScroll: "auto",
};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function BestSellerCarousel({
  products,
}: {
  products: {
    product_title: string;
    slug: string;
    lowest_offer: number | string;
    image_file: string;
  }[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const { update } = useSession();
  return (
    <section className="best__seller__carousel">
      <div className="best__seller__carousel__viewport" ref={emblaRef}>
        <div className="best__seller__carousel__container">
          {products.map((product, index) => (
            <a
              className={cn(
                "best__seller__carousel__slide",
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              )}
              key={index}
              href={`${product.slug}`}
            >
              <div className="flex items-center h-full">
                <span className="flex items-center px-5 text-2xl">
                  {index + 1}
                </span>
                <img
                  src={`${CLOUDFLARE_URL}/${product.image_file}/thumbnail`}
                  alt={product.product_title}
                  className="h-full"
                />
                <div className="justify-between w-full items-center px-5 hidden md:flex">
                  <div className="hidden lg:block">
                    <h2 className="font-light text-sm ">
                      {product.product_title}
                    </h2>
                  </div>
                  <div className="hidden md:block pl-2 text-xs">
                    <p>RM {price(product.lowest_offer)}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
