import { Footer } from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

export default function MainLayout({
  children,
  test,
}: {
  children: React.ReactNode;
  test: any;
}) {
  return (
    <>
      <NavigationBar />
      {test}
      {children}
      <Footer />
    </>
  );
}
