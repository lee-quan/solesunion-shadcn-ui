import { ApolloWrapper } from "./graphql/apollo-wrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
