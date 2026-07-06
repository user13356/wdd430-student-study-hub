export default function EditNotePage() {
  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Edit Note</h1>

      <form className="mt-4 flex flex-col gap-3">
        <input className="border p-2" placeholder="Title" />
        <input className="border p-2" placeholder="Subject" />
        <textarea className="border p-2" placeholder="Description" />

        <button className="bg-yellow-500 text-white p-2">
          Update Note
        </button>
      </form>
    </main>
  );
}