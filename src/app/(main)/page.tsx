"use client";

import CustomerCarousel from "@/components/carousel/EmblaCarousel";
import LandingPageHero from "@/components/landing-page-hero";
import ProductCarousel from "@/components/carousel/ProductCarousel";
import { Button } from "@/components/ui/button";
import { gql, useQuery } from "@apollo/client";
import BestSellerCarousel from "@/components/carousel/BestSellerCarousel";

const GET_USERS = gql`
    query GetUsers($category: String!) {
        productsForHomePage(category: $category) {
            products {
                section_name
                products {
                    product_title
                    slug
                    image {
                        image_file
                    }
                    lowest_active_offer {
                        offer_price
                    }
                }
            }
            recommended {
                product_title
                slug
                image {
                    image_file
                }
                lowest_active_offer {
                    offer_price
                }
            }
            best_seller_male {
                product_title
                slug
                lowest_offer
                image_file
            }
            best_seller_female {
                product_title
                slug
                lowest_offer
                image_file
            }
        }
    }
`;

export default function Home() {
    const { loading, error, data, refetch } = useQuery(GET_USERS, {
        variables: {
            category: "sneakers",
        },
    });

    return (
        <div>
            <LandingPageHero />
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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && !!!error && (
                <>
                    <section className="w-full py-12">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none uppercase tracking-wider">
                                        Most Popular
                                    </h2>
                                </div>
                                <div className="w-20 h-px bg-gray-200 dark:bg-gray-800" />

                                <div className="grid grid-cols-2 divide-x-0">
                                    <p>
                                        <strong>MEN</strong>'s
                                    </p>
                                    <p>
                                        <strong>WOMEN</strong>'s
                                    </p>
                                    <BestSellerCarousel
                                        products={
                                            data.productsForHomePage
                                                .best_seller_male
                                        }
                                    />
                                    <BestSellerCarousel
                                        products={
                                            data.productsForHomePage
                                                .best_seller_female
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {data.productsForHomePage.products.map(
                        (section: any, index: number) => (
                            <ProductCarousel section={section} key={index} />
                        )
                    )}
                    <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none uppercase tracking-wider text-center">
                        Our Lovely Customers
                    </h2>
                    <CustomerCarousel />
                </>
            )}
        </div>
    );
}
