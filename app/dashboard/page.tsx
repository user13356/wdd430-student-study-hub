import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <div>Please login first</div>;
  }

  return (
    <main className="p-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">
          Welcome {session.user?.name}
        </h1>

        {/* LOGOUT TOP RIGHT */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </form>
      </div>

      {/* CONTENT */}
      <div className="mt-6">
        <p className="text-gray-600">
          {session.user?.email}
        </p>
      </div>
    </main>
  );
}