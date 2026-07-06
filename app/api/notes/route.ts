import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { auth } from "@/auth";

// GET all notes for the logged-in user
export async function GET() {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json([], { status: 200 });
    }

    const notes = await Note.find({
      userId: session.user?.email,
    });

    return Response.json(notes);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to load notes" },
      { status: 500 }
    );
  }
}

// CREATE a new note
export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, content } = await req.json();

    const note = await Note.create({
      title,
      content,
      userId: session.user?.email,
    });

    return Response.json(note);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}