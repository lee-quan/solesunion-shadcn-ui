"use client";

import { useSession } from "next-auth/react";

export default function useUser() {
  const session = useSession();
  return session.data?.user || null;
}

export function useUserRole() {
  const session = useSession();
  return session.data?.user?.role || "C";
}