import { CLOUDFLARE_URL } from "@/lib/constants";
import { useClient } from "@/lib/graphql/client";
import { GET_PRODUCTS_FOR_BROWSE_PAGE } from "@/lib/graphql/queries/productQueries";
import { decrypt, price } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";
import BrowseAllPage from "../BrowseAllPage";

export default async function Page({ searchParams }: { searchParams: any }) {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const pathname = `/${fullUrl.split("/").pop()}`;

  const qParam = searchParams.q
    ? JSON.parse(decrypt(searchParams.q))
    : { sizes: [], brands: [], sortBy: "po.created_at desc" };

  const client = await useClient();
  const { data } = await client.query({
    query: GET_PRODUCTS_FOR_BROWSE_PAGE,
    variables: {
      category: pathname.split("/").pop(),
      brands: qParam.brands,
      sizes: qParam.sizes,
      page: 1,
      sortBy: qParam.sortBy,
    },
    pollInterval: 0,
  });


  return (
    <>
      <BrowseAllPage data={data} />
    </>
  );
}
