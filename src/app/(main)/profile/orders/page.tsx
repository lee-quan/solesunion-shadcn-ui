import ProfileOrdersPage from "@/components/pages/profile/ProfileOrdersPage";
import { makeServerApolloClient } from "@/lib/graphql/client";
import { GET_ORDER_HISTORY } from "@/lib/graphql/queries/profileQueries";
import { getServerSession } from "next-auth";

export default async function OrdersPage() {
  const session = await getServerSession();
  const { data } = await makeServerApolloClient(session).query({
    query: GET_ORDER_HISTORY,
    variables: {
      limit: 10,
      page: 1,
    },
  });
  console.log(data);
  return <ProfileOrdersPage />;
}
