// import Image from "next/image";

import { auth } from "@/auth";
import { getClient } from "@/lib/graphql/client";
import { GET_PRODUCT_FOR_HOME_PAGE } from "@/lib/graphql/queries/productQueries";

export default async function UserAvatar() {
  const session = await auth();
  const client = getClient();

  const { data } = await client.query({
    query: GET_PRODUCT_FOR_HOME_PAGE,
  });

  console.log(data);
  if (!session?.user) return <>nope</>;

  return (
    <div>
      <p>{session?.user?.email}</p>
      <p>{data && JSON.stringify(data)}</p>
      {/* <button onClick={() => signOut()}>SIGNOUT</button> */}
    </div>
  );
}
