export default function ProfilePage() {
  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-4 space-y-3">
        <input className="border p-2 w-full" placeholder="Name" />
        <input className="border p-2 w-full" placeholder="Email" />

        <button className="bg-blue-500 text-white p-2 w-full">
          Update Profile
        </button>
      </div>
    </main>
  );
}