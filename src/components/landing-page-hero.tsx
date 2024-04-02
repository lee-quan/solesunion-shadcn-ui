import Link from "next/link";

export default function LandingPageHero() {
    return (
        <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                    <img
                        alt="Hero"
                        className="mx-auto w-full h-full aspect-video overflow-hidden object-cover sm:w-full lg:order-last"
                        src="/images/solesunion_store.jpeg"
                    />
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Welcome to Soles Union
                            </h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Your one-stop destination for limited edition
                                sneakers and local brand apparel. Experience the
                                thrill of exclusivity and diversity in our
                                curated marketplace.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Shop Now
                            </Link>
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Sell With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
