import ProfileOrdersPage from "@/components/pages/profile/ProfileOrdersPage";
import { GET_ORDER_HISTORY } from "@/lib/graphql/queries/profileQueries";
import { getServerSession } from "next-auth";

export default async function OrdersPage() {
  const session = await getServerSession();
  return <ProfileOrdersPage />;
}
