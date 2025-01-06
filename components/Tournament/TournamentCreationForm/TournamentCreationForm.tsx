"use client";

import { createTournament } from "@/app/actions/tournamentActions";

export default function TournamentCreationForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const startDate = formData.get("startDate") as string;
    const availableCourts = Number(formData.get("availableCourts"));

    if (!name || !startDate || isNaN(availableCourts) || availableCourts < 1) {
      alert(
        "All fields are required, and available courts must be at least 1!"
      );
      return;
    }

    await createTournament({
      name,
      startDate: new Date(startDate),
      availableCourts,
    });

    alert("Tournament created successfully!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto border rounded shadow bg-white"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium">
          Tournament Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="startDate" className="block mb-2 text-sm font-medium">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="availableCourts"
          className="block mb-2 text-sm font-medium"
        >
          Available Courts
        </label>
        <input
          type="number"
          id="availableCourts"
          name="availableCourts"
          min="1"
          defaultValue={1}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Tournament
      </button>
    </form>
  );
}
