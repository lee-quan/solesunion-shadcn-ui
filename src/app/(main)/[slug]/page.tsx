import ProductDetailPageConsignment from "@/components/pages/ProductDetailPageConsignment";
import ProductDetailPageDirectListing from "@/components/pages/ProductDetailPageDirectListing";
import { useClient } from "@/lib/graphql/client";
import { GET_PRODUCT } from "@/lib/graphql/queries/productQueries";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const client = await useClient();

  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      slug,
    },
  });

  return data.product.consignment == 0 ? (
    <ProductDetailPageDirectListing product={data.product} />
  ) : (
    <ProductDetailPageConsignment product={data.product} />
  );
}
