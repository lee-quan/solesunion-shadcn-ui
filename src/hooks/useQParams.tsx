"use client";

import { decrypt } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function useQParam() {
  const searchParams = useSearchParams();
  const qParams = searchParams.get("q")
    ? JSON.parse(decrypt(searchParams.get("q")) || "{}")
    : {};
  return qParams;
}
