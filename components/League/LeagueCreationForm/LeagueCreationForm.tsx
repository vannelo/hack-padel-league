"use client";

import { createLeague } from "@/app/actions/leagueActions";
import { Level } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function LeagueCreationForm() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const name = formData.get("name") as string;
    const level = formData.get("level") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    if (!name || !level || !startDate || !endDate) {
      alert("Please fill in all fields!");
      return;
    }

    // Call the server action to add a league
    await createLeague({
      name,
      level,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    alert("League added successfully!");
    router.refresh();
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-md p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          League Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="level"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Level:
        </label>
        <select
          id="level"
          name="level"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={Level.One}>Level 1</option>
          <option value={Level.Two}>Level 2</option>
          <option value={Level.Three}>Level 3</option>
          <option value={Level.Four}>Level 4</option>
          <option value={Level.Five}>Level 5</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="endDate"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Add League
      </button>
    </form>
  );
}
