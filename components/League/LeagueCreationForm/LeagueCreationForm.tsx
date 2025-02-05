"use client";

import { createLeague } from "@/app/actions/leagueActions";
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface LeagueCreationFormProps {
  onLeagueCreated: (message: string) => void;
  onError: (message: string) => void;
}

export default function LeagueCreationForm({
  onLeagueCreated,
  onError,
}: LeagueCreationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Call the server action with only the league name.
      await createLeague({ name });
      onLeagueCreated(`Liga "${name}" añadida exitosamente.`);
    } catch {
      onError("Error al crear la liga. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "500px",
        margin: "auto",
        paddingTop: 2,
      }}
    >
      <TextField
        required
        fullWidth
        id="name"
        name="name"
        label="Nombre de la Liga"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        error={!!error}
        helperText={error}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? "Creando..." : "Añadir Liga"}
      </Button>
    </Box>
  );
}
