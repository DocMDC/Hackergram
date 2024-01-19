"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = api.register.register.useMutation();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register.mutateAsync({
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col" onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-2 h-12 w-36 border border-b bg-gray-300 p-2 text-black outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-2 h-12 w-36 border border-b bg-gray-300 p-2 text-black outline-none"
        />
        <button className="h-12 w-48 bg-500 p-3 text-100">Submit</button>
      </form>
    </div>
  );
}
