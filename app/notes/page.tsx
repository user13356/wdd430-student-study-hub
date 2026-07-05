"use client";

import { useState, useEffect } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  async function loadNotes() {
    try {
      const res = await fetch("/api/notes");

      if (!res.ok) {
        console.error("Failed to load notes");
        return;
      }

      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  async function createNote() {
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and content.");
      return;
    }

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    if (!res.ok) {
      alert("Failed to create note.");
      return;
    }

    setTitle("");
    setContent("");

    loadNotes();
  }

  async function deleteNote(id: string) {
    const confirmed = confirm("Are you sure you want to delete this note?");

    if (!confirmed) return;

    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete note.");
      return;
    }

    loadNotes();
  }

  async function editNote(note: Note) {
    const newTitle = prompt("Edit title", note.title);
    if (newTitle === null) return;

    const newContent = prompt("Edit content", note.content);
    if (newContent === null) return;

    const res = await fetch(`/api/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
      }),
    });

    if (!res.ok) {
      alert("Failed to update note.");
      return;
    }

    loadNotes();
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">My Notes</h1>

      {/* Create Note */}
      <div className="mt-6 border rounded p-4 shadow">
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded mt-3"
          placeholder="Content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
          onClick={createNote}
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="mt-8">
        {notes.length === 0 ? (
          <p className="text-gray-500">You have no notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="border rounded p-4 mb-4 shadow"
            >
              <h2 className="text-lg font-bold">{note.title}</h2>

              <p className="mt-2">{note.content}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => editNote(note)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}