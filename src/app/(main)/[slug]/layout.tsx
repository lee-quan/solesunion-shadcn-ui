import { CLOUDFLARE_URL } from "@/lib/constants";
import { makeClient } from "@/lib/graphql/client";
import { GET_PRODUCT } from "@/lib/graphql/queries/productQueries";
import { getServerSession } from "next-auth/next";

export default async function ProductPageLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const client = makeClient(session);
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      slug: params.slug,
    },
  });

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-3 items-start">
        <div className="grid gap-4">
          <div>
            <h1 className="font-bold text-3xl lg:text-4xl">
              {data?.product.product_title}
            </h1>
            <h2>{data?.product.product_sku}</h2>
          </div>
        </div>
        {data?.product.images.map(
          (image: { image_file: string }, index: number) => (
            <img
              src={`${CLOUDFLARE_URL}/${image.image_file}/public`}
              key={index}
            />
          )
        )}
      </div>
      <div className="grid gap-4 items-start">{children}</div>
    </div>
  );
}
