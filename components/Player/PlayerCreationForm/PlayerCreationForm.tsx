"use client";

import { useState, useEffect } from "react";
import { Gender, Level } from "@prisma/client";
import { createPlayer, updatePlayer } from "@/app/actions/playerActions";
import { genderMap, levelMap } from "@/constants/playerEnums";
import {
  Button,
  TextField,
  Select,
  type SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Stack,
} from "@mui/material";

interface PlayerCreationFormProps {
  onPlayerCreated: (message: string) => void;
  onError: (message: string) => void;
  // eslint-disable-next-line
  initialData: any | null;
}

export default function PlayerCreationForm({
  onPlayerCreated,
  onError,
  initialData,
}: PlayerCreationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    phone: "",
    gender: Gender.Male as Gender,
    level: Level.Six as Level,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        email: initialData.email ?? "",
        age: initialData.age ? initialData.age.toString() : "",
        phone: initialData.phone ?? "",
        gender: initialData.gender,
        level: initialData.level,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", age: "", phone: "" };

    if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const playerData = {
        ...formData,
        age: Number.parseInt(formData.age, 10),
      };

      if (initialData) {
        await updatePlayer(playerData);
        onPlayerCreated(`${formData.name} ha sido actualizado exitosamente.`);
      } else {
        await createPlayer(playerData);
        onPlayerCreated(`${formData.name} ha sido añadido al sistema.`);
      }
      // eslint-disable-next-line
    } catch (error: any) {
      onError(
        initialData
          ? "Error al actualizar el jugador. Por favor, inténtalo de nuevo."
          : "Error al crear el jugador. Por favor, inténtalo de nuevo."
      );
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
      }}
    >
      <Typography variant="h6" gutterBottom>
        {initialData ? "Editar jugador" : "Crear jugador"}
      </Typography>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mb: 2 }}>
        <TextField
          required
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Stack>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          id="age"
          name="age"
          label="Edad"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
          error={!!errors.age}
          helperText={errors.age}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Teléfono"
          value={formData.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Stack>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="gender-label">Género</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleSelectChange}
            label="Género"
          >
            {Object.entries(genderMap).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="level-label">Level</InputLabel>
          <Select
            labelId="level-label"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleSelectChange}
            label="Level"
          >
            {Object.entries(levelMap).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting
          ? "Guardando..."
          : initialData
          ? "Actualizar Jugador"
          : "Crear Jugador"}
      </Button>
    </Box>
  );
}
