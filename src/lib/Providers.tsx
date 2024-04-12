import { ApolloWrapper } from "./graphql/apollo-wrapper";
import { getServerSession } from "next-auth/next";
import SessionProvider from "./nextAuth/SessionProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
