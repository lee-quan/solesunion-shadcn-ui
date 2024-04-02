import { Footer } from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavigationBar />
            {children}
            <Footer />
        </>
    );
}
