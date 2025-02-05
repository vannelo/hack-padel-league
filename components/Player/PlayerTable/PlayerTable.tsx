"use client";

import { deletePlayer } from "@/app/actions/playerActions";
import { levelMap, genderMap } from "@/constants/playerEnums";
import { Player } from "@/types/player";
import { Button, Stack, TextField } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useState } from "react";

interface PlayerTableProps {
  players: Player[];
  onPlayerDeleted: () => void;
  onPlayerEdit: (playerId: string) => void;
}

export default function PlayerTable({
  players,
  onPlayerDeleted,
  onPlayerEdit,
}: PlayerTableProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "age", headerName: "Edad", width: 70 },
    { field: "phone", headerName: "Teléfono", flex: 1 },
    {
      field: "gender",
      headerName: "Género",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <span>{genderMap[params.value as keyof typeof genderMap]}</span>
      ),
    },
    {
      field: "level",
      headerName: "Nivel",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <span>{levelMap[params.value as keyof typeof levelMap]}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            onClick={() => onPlayerEdit(params.id as string)}
            variant="contained"
            color="primary"
            size="small"
          >
            Editar
          </Button>
          <Button
            onClick={() =>
              handleDelete(params.id as string, params.row.name as string)
            }
            variant="contained"
            color="error"
            size="small"
          >
            Eliminar
          </Button>
        </Stack>
      ),
    },
  ];

  const rows = filteredPlayers.map((player) => ({
    id: player.id,
    name: player.name,
    email: player.email,
    age: player.age,
    phone: player.phone,
    gender: player.gender,
    level: player.level,
  }));

  async function handleDelete(id: string, name: string) {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${name}?`)) {
      await deletePlayer(id);
      alert("Jugador eliminado exitosamente");
      onPlayerDeleted();
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <TextField
          label="Buscar jugador"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPlayers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm
              ? "No se encontraron jugadores que coincidan."
              : "No hay jugadores registrados."}
          </p>
        </div>
      ) : (
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50]}
            pagination
            disableRowSelectionOnClick
          />
        </div>
      )}
    </div>
  );
}
