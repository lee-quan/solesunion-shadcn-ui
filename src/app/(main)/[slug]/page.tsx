import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { makeClient, makeServerApolloClient } from "@/lib/graphql/client";
import { GET_PRODUCT } from "@/lib/graphql/queries/productQueries";
import { getServerSession } from "next-auth";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession();
  const { slug } = params;
  const client = makeServerApolloClient(session);

  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      slug,
    },
  });

  return <ProductDetailPage product={data.product}/>;
}
