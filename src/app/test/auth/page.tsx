import { auth, signOut } from "@/auth";
import TestAuthPage from "./TestAuthPage";
// import { signOut } from "next-auth/react";

export default async function Page() {
  const session = await auth();

  if (!session) return <TestAuthPage />;
  return (
    <>
      <p>{session && JSON.stringify(session, null, 2)}</p>
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
