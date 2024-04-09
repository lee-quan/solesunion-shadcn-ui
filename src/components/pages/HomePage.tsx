"use client";

import CustomerCarousel from "@/components/carousel/EmblaCarousel";
import LandingPageHero from "@/components/landing-page-hero";
import ProductCarousel from "@/components/carousel/ProductCarousel";
import { Button } from "@/components/ui/button";
import BestSellerCarousel from "@/components/carousel/BestSellerCarousel";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_FOR_HOME_PAGE } from "@/lib/graphql/queries/productQueries";

export default function HomePage({
  data,
}: {
  data: {
    productsForHomePage: {
      sneakers: {
        products: {
          section_name: string;
          products: {
            product_title: string;
            slug: string;
            image: {
              image_file: string;
            };
            lowest_active_offer: {
              offer_price: number;
            };
          }[];
        }[];
        recommended: {
          product_title: string;
          slug: string;
          image: {
            image_file: string;
          };
          lowest_active_offer: {
            offer_price: number;
          };
        }[];
        best_seller_male: {
          product_title: string;
          slug: string;
          lowest_offer: any;
          image_file: string;
        }[];
        best_seller_female: {
          product_title: string;
          slug: string;
          lowest_offer: any;
          image_file: string;
        }[];
      };
      apparels: {
        brands: {
          brand_name: string;
          products: {
            product_title: string;
            slug: string;
            image: {
              image_file: string;
            };
            lowest_active_offer: {
              offer_price: number;
            };
          }[];
        }[];
        best_seller_male: {
          product_title: string;
          slug: string;
          lowest_offer: any;
          image_file: string;
        }[];
        best_seller_female: {
          product_title: string;
          slug: string;
          lowest_offer: any;
          image_file: string;
        }[];
      };
    };
  };
}) {
  const [activeCategory, setActiveCategory] = useState("apparels");

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setActiveCategory("apparels");
      console.log("swiped left");
    },
    onSwipedRight: () => {
      setActiveCategory("sneakers");
      console.log("swiped right");
    },
  });

  const categoryContent = (category: string) => {
    switch (category) {
      case "sneakers":
        // Render sneakers content
        return (
          <>
            <section className="w-full py-10">
              <div className="container px-4 md:px-6">
                <span className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Shop by Category
                </span>
                <div className="flex gap-6 mt-6">
                  <Button
                    className="w-full shadow p-8 text-lg font-bold text-center"
                    variant="secondary"
                  >
                    Sneakers
                  </Button>
                  <Button
                    className="w-full shadow p-8 text-lg font-bold text-center"
                    variant="secondary"
                  >
                    Apparels
                  </Button>
                </div>
              </div>
            </section>
            <section className="w-full py-12">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none uppercase tracking-wider">
                      Most Popular
                    </h2>
                  </div>
                  <div className="w-20 h-px bg-gray-200 dark:bg-gray-800" />

                  <div className="w-full grid grid-cols-2 divide-x-0">
                    <p>
                      <strong>MEN</strong>'s
                    </p>
                    <p>
                      <strong>WOMEN</strong>'s
                    </p>
                    <BestSellerCarousel
                      products={
                        data.productsForHomePage.sneakers.best_seller_male
                      }
                    />
                    <BestSellerCarousel
                      products={
                        data.productsForHomePage.sneakers.best_seller_female
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            {data.productsForHomePage.sneakers.products.map(
              (section: any, index: number) => (
                <ProductCarousel section={section} key={index} />
              )
            )}
          </>
        );
      case "apparels":
        // Render apparels content
        return (
          <>
            <section className="w-full py-10">
              <div className="container px-4 md:px-6">
                <span className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Shop by Category
                </span>
                <div className="flex gap-6 mt-6">
                  <Button
                    className="w-full shadow p-8 text-lg font-bold text-center"
                    variant="secondary"
                  >
                    Sneakers
                  </Button>
                  <Button
                    className="w-full shadow p-8 text-lg font-bold text-center"
                    variant="secondary"
                  >
                    Apparels
                  </Button>
                </div>
              </div>
            </section>
            <section className="w-full py-12">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none uppercase tracking-wider">
                      Most Popular
                    </h2>
                  </div>
                  <div className="w-20 h-px bg-gray-200 dark:bg-gray-800" />

                  <div className="w-full grid grid-cols-2 divide-x-0">
                    <p>
                      <strong>MEN</strong>'s
                    </p>
                    <p>
                      <strong>WOMEN</strong>'s
                    </p>
                    <BestSellerCarousel
                      products={
                        data.productsForHomePage.apparels.best_seller_male
                      }
                    />
                    <BestSellerCarousel
                      products={
                        data.productsForHomePage.apparels.best_seller_female
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            {data.productsForHomePage.apparels.brands.map(
              (brand: any, index: number) => (
                <ProductCarousel section={brand} key={index} />
              )
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="swiper-container w-full" {...handlers}>
      <div>
        <LandingPageHero />
        {categoryContent(activeCategory)}
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none uppercase tracking-wider text-center">
          Our Lovely Customers
        </h2>
        <CustomerCarousel />
      </div>
    </div>
  );
}