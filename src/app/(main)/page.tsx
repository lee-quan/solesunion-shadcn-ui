import HomePage from "@/components/pages/HomePage";
import { auth } from "@/lib/auth";
import { getClient } from "@/lib/graphql/apollo-client";
import { GET_PRODUCT_FOR_HOME_PAGE } from "@/lib/graphql/queries/productQueries";

export default async function UserAvatar() {
  const session = await auth();
  const client = getClient();

  const { data } = await client.query({
    query: GET_PRODUCT_FOR_HOME_PAGE,
  });

  if (!session?.user) return <>nope</>;

  return (
    <div>
      <HomePage data={data} />
    </div>
  );
}
