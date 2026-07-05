"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      {/* 👇 BACK BUTTON */}
      <div className="mb-4">
        <Link href="/">
          <button className="text-blue-500 underline">
            ← Back to Home
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 mt-4 w-full"
        onClick={handleLogin}
      >
        Login
      </button>

      <div className="mt-4 text-center">
        <p className="text-gray-600">Don't have an account?</p>

        <Link href="/register">
          <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </Link>
      </div>
    </main>
  );
}