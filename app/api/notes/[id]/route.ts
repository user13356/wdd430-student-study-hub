import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { auth } from "@/auth";

// Update a note
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { title, content } = await request.json();

    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        userId: session.user?.email,
      },
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json(note);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}

// Delete a note
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const note = await Note.findOneAndDelete({
      _id: id,
      userId: session.user?.email,
    });

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}