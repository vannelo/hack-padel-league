"use client";

import { deletePlayer } from "@/app/actions/playerActions";
import { levelMap, genderMap } from "@/constants/playerEnums";
import { Button, Stack } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useState } from "react";

export default function PlayerTable({
  players,
  onPlayerDeleted,
  onPlayerEdit,
}: {
  // eslint-disable-next-line
  players: any[];
  onPlayerDeleted: () => void;
  onPlayerEdit: (playerId: string) => void;
}) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

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
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => onPlayerEdit(params.id as string)}
            variant="contained"
            color="primary"
            size="small"
          >
            Editar
          </Button>
          <Button
            onClick={() => handleDelete(params.id as string)}
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

  const rows = players.map((player) => ({
    id: player.id,
    name: player.name,
    email: player.email,
    age: player.age,
    phone: player.phone,
    gender: player.gender,
    level: player.level,
  }));

  async function handleDelete(id: string) {
    if (window.confirm("¿Estás seguro de que quieres eliminar este jugador?")) {
      await deletePlayer(id);
      alert("Jugador eliminado exitosamente");
      onPlayerDeleted();
    }
  }

  return (
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
  );
}
