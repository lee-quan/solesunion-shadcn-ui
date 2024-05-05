import HomePage from "@/components/pages/HomePage";
import { getClient } from "@/lib/graphql/apollo-client";
import { GET_PRODUCT_FOR_HOME_PAGE } from "@/lib/graphql/queries/productQueries";

export default async function _HomePage() {
  const client = getClient();

  const { data } = await client.query({
    query: GET_PRODUCT_FOR_HOME_PAGE,
  });

  return (
    <div>
      <HomePage data={data} />
    </div>
  );
}
