"use client";

import { deletePlayer } from "@/app/actions/playerActions";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";

// eslint-disable-next-line
export default function PlayerTable({ players }: { players: any[] }) {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "level",
      headerName: "Level",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          onClick={() => handleDelete(params.id as string)}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = players.map((player) => ({
    id: player.id,
    name: player.name,
    level: player.level,
  }));

  async function handleDelete(id: string) {
    await deletePlayer(id);
    alert("Jugador eliminado exitosamente");
    router.refresh();
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        pagination
        disableRowSelectionOnClick
      />
    </div>
  );
}
