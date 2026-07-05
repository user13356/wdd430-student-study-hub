import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Student Study Hub</h1>

      <p className="mt-2 text-gray-600">
        Share and find study notes easily.
      </p>

      <div className="mt-6">
        <Link href="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </Link>
      </div>
    </main>
  );
}