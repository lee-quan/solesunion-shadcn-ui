import ProductPageLayout from "@/components/pages/ProductPageLayout";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return <ProductPageLayout slug={params.slug}>{children}</ProductPageLayout>;
}
