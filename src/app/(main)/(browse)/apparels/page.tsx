import { CLOUDFLARE_URL } from "@/lib/constants";
import { GET_PRODUCTS_FOR_BROWSE_PAGE } from "@/lib/graphql/queries/productQueries";
import { decrypt } from "@/lib/utils";
import { headers } from "next/headers";
import BrowseAllPage from "../BrowseAllPage";
import { getClient } from "@/lib/graphql/apollo-client";

export default async function Page({ searchParams }: { searchParams: any }) {
  const headersList = headers();
  const fullUrl = headersList.get("x-url") || "";
  const pathname = `${fullUrl.split("/").pop()}`;
  console.log(123)
  const qParam = searchParams.q
    ? JSON.parse(decrypt(searchParams.q))
    : { sizes: [], brands: [], sortBy: "po.created_at desc", page: 1 };
  console.log(headersList);
  const client = getClient();
  const { data } = await client.query({
    query: GET_PRODUCTS_FOR_BROWSE_PAGE,
    variables: {
      category: pathname.includes("?") ? pathname.split("?")[0] : pathname,
      brands: qParam.brands || [],
      sizes: qParam.sizes || [],
      page: qParam.page || 1,
      sortBy: qParam.sortBy || "po.created_at desc",
    },
  });

  return (
    <>
      <BrowseAllPage data={data} />
    </>
  );
}
