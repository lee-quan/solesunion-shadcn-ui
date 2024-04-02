import { ApolloWrapper } from "./graphql/apollo-wrapper";
import { getServerSession } from "next-auth";
import SessionProvider from "./nextAuth/SessionProvider";

export default async function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <SessionProvider session={session}>
            <ApolloWrapper>{children}</ApolloWrapper>
        </SessionProvider>
    );
}
