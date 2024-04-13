"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("a@gmail.com");
    const [password, setPassword] = useState("123");
    return (
        <form
            action={async () => {
                const response = await signIn("credentials", {
                    // redirect: false,
                    callbackUrl: "/",
                    email,
                    password,
                });
                console.log(response);
            }}
        >
            <label>
                Email
                <input
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                Password
                <input
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
}
