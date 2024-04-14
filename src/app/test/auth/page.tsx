import { auth, signOut } from "@/lib/auth";
import TestAuthPage from "./TestAuthPage";
import { getSession, useSession } from "next-auth/react";
// import { signOut } from "next-auth/react";

export default async function Page() {
  const session = await auth();
  

  return (
    <>
      <TestAuthPage />
      <p>{JSON.stringify(session, null, 2)}</p>
      <form
        action={async () => {
          "use server";
          const response = await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
}
