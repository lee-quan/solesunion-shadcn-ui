import { CLOUDFLARE_URL } from "@/lib/constants";
import { price } from "@/lib/utils";
import Link from "next/link";

export default function BrowseAllPage({ data }: { data: any }) {
  return (
    <>
      {data?.browseProduct?.data.map((product: any) => (
        <div className="relative group" key={product.slug}>
          <Link className="absolute inset-0 z-10" href={`/${product.slug}`}>
            <span className="sr-only">View</span>
          </Link>
          <img
            alt={product.product_title}
            className="rounded-lg object-contain w-full aspect-square group-hover:opacity-50 transition-opacity"
            height={200}
            src={`${CLOUDFLARE_URL}/${product.image_file}/public`}
            width={200}
          />
          <div className="flex-1 py-4">
            <h3 className="font-semibold tracking-tight">
              {product.product_title}
            </h3>
            <div className="flex items-center gap-0.5"></div>
            <h4 className="font-semibold">RM {price(product.lowest_offer)}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
