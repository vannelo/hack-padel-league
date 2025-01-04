"use client";

import { createPlayer } from "@/app/actions/playerActions";

export default function PlayerCreationForm() {
  async function handleSubmit(formData: FormData) {
    const name = formData.get("name") as string;
    const email = "user@gmail.com";
    const age = 20;
    const phone = "5512341234";
    const gender = "Male";
    const level = "Five";

    // Call the server action to add a player
    await createPlayer({ name, email, age, phone, gender, level });
    alert("Player added successfully!");
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Add Player
      </button>
    </form>
  );
}
