"use client";

import { Box, Typography, Button } from "@mui/material";
import NextLink from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        gap: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        🎾 Bienvenido a Hack Padel Admin 🎾
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Administra jugadores, ligas y torneos fácilmente.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          component={NextLink}
          href="/admin/jugadores"
        >
          Gestionar Jugadores
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={NextLink}
          href="/admin/ligas"
        >
          Gestionar Ligas
        </Button>
        <Button
          variant="contained"
          color="success"
          component={NextLink}
          href="/admin/torneos"
        >
          Gestionar Torneos
        </Button>
      </Box>
    </Box>
  );
}
