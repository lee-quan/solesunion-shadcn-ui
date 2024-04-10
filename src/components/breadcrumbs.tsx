"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadCrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  //   pathSegments = ["a","b", "c"]
  //    href = "/a", "/a/b", "/a/b/c"
  function replaceHyphenWithSpace(text: string) {
    return text.replace(/-/g, " ").toUpperCase();
  }

  const formatBreadcrumb = (pathSegment: string) => {
    // Replace hyphens with spaces and capitalize each word
    return pathSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  function StyledBreadCrumbLink({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <BreadcrumbLink href={href} className="text-white text-xs md:text-black">
        {children}
      </BreadcrumbLink>
    );
  }

  function StyledBreadCrumbPage({ children }: { children: React.ReactNode }) {
    return (
      <BreadcrumbPage className="text-white md:text-black">
        {children}
      </BreadcrumbPage>
    );
  }
  return (
    <Breadcrumb className="py-2 px-4 md:py-5 md:px-6 container bg-black text-white md:bg-white md:text-black uppercase">
      <BreadcrumbList>
        <BreadcrumbItem>
          <StyledBreadCrumbLink href="/">Home</StyledBreadCrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const isLastSegment = index === pathSegments.length - 1;
          const formattedSegment = formatBreadcrumb(segment);
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={index}>
              {"/"}
              <BreadcrumbItem key={segment}>
                {isLastSegment ? (
                  <StyledBreadCrumbPage>
                    {formattedSegment}
                  </StyledBreadCrumbPage>
                ) : (
                  <StyledBreadCrumbLink href={href}>
                    {formattedSegment}
                  </StyledBreadCrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
