"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      alert("Error: " + errorText);
      return;
    }

    const data = await res.json();

    alert(data.message || "Account created successfully");

    router.push("/login");
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

      <h1 className="text-2xl font-bold">Register</h1>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

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
        className="bg-green-500 text-white p-2 mt-4 w-full"
        onClick={handleRegister}
      >
        Create Account
      </button>
    </main>
  );
}