import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

// GET single note
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const note = await Note.findById(params.id);

  return Response.json(note);
}

// UPDATE note
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const data = await req.json();

  const updatedNote = await Note.findByIdAndUpdate(
    params.id,
    data,
    { new: true }
  );

  return Response.json(updatedNote);
}

// DELETE note
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Note.findByIdAndDelete(params.id);

  return Response.json({ message: "Note deleted successfully" });
}