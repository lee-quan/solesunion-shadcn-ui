import { ApolloWrapper } from "./graphql/apollo-wrapper";
import { getServerSession } from "next-auth/next";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
