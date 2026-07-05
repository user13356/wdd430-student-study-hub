import Link from "next/link";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  //  If NOT logged in, show nothing
  if (!session) return null;

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      {/* LINKS ONLY FOR LOGGED-IN USERS */}
      <div className="flex gap-4 font-semibold">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/notes">Notes</Link>
      </div>
    </nav>
  );
}