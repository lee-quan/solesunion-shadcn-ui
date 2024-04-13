import { auth } from "@/auth";
import TestAuthPage from "./testAuthPage";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <TestAuthPage />

      <p>{session && JSON.stringify(session, null, 2)}</p>
    </>
  );
}
