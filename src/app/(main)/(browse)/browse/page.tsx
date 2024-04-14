import { decrypt } from "@/lib/utils";
import { headers } from "next/headers";
import BrowseAllPage from "../BrowseAllPage";
import { getClient } from "@/lib/graphql/apollo-client";
import { GET_PRODUCTS_FOR_BROWSE_PAGE } from "@/lib/graphql/queries/productQueries";

export default async function Page({ searchParams }: { searchParams: any }) {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const pathname = `/${fullUrl.split("/").pop()}`;

  const qParam = searchParams.q
    ? JSON.parse(decrypt(searchParams.q))
    : { sizes: [], brands: [], sortBy: "po.created_at desc", page: 1 };

  const client = getClient();
  const { data } = await client.query({
    query: GET_PRODUCTS_FOR_BROWSE_PAGE,
    variables: {
      category: pathname.split("/").pop() || "",
      brands: qParam.brands || [],
      sizes: qParam.sizes || [],
      page: qParam.page || 1,
      sortBy: qParam.sortBy || "po.created_at desc",
    },
    pollInterval: 0,
  });

  return (
    <>
      <BrowseAllPage data={data} />
    </>
  );
}
