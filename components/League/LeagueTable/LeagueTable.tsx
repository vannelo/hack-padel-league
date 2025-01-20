"use client";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { Button, Chip } from "@mui/material";

// eslint-disable-next-line
export default function LeagueTable({ leagues }: { leagues: any[] }) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={
            params.value === "Upcoming"
              ? "primary"
              : params.value === "InProgress"
              ? "secondary"
              : "default"
          }
        />
      ),
    },
    {
      field: "level",
      headerName: "level",
    },
    {
      field: "players",
      headerName: "players",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Link href={`/admin/ligas/${params.id}`} passHref>
          <Button variant="contained" color="primary" size="small">
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  const rows = leagues.map((league) => ({
    id: league.id,
    status: league.status,
    name: league.name,
    level: league.level,
    players: `${league.players.length} jugadores`,
    couples: league.couples,
  }));

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
