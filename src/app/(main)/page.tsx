import { useClient } from "@/lib/graphql/client";
import { GET_PRODUCT_FOR_HOME_PAGE } from "@/lib/graphql/queries/productQueries";
import HomePage from "@/components/pages/HomePage";

export default async function Home() {
    const client = await useClient();

    const { data } = await client.query({
        query: GET_PRODUCT_FOR_HOME_PAGE,
    });

    return <HomePage data={data} />;
    // return <>HomePage</>;
}
