import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export default function Page({
  searchParams,
}: {
  searchParams: {
    token: string;
    email: string;
  };
}) {
  return <ResetPasswordPage searchParams={searchParams} />;
}
