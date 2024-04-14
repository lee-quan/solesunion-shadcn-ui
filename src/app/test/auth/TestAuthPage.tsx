"use client";

import { auth } from "@/lib/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TestAuthPage() {
  const [email, setEmail] = useState("a@gmail.com");
  const [password, setPassword] = useState("123");
  console.log(process.env.NODE_ENV);
  useEffect(() => {}, []);
  return (
    <form
      action={async () => {
        const response = await signIn("credentials", {
          redirect: false,
          // callbackUrl: "/test/auth",
          email,
          password,
        });
        // window.location.reload();
      }}
      className="flex flex-col gap-4"
    >
      <label>Email</label>
      <input
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border"
      />
      <label>Password</label>
      <input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
