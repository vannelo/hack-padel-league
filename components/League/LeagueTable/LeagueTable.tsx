"use client";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { Button, Chip, TextField } from "@mui/material";
import { League } from "@/types/league";
import { leagueStatusMap } from "@/constants/leagueEnums";

interface LeagueTableProps {
  leagues: League[];
}

export default function LeagueTable({ leagues }: LeagueTableProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={leagueStatusMap[params.value as keyof typeof leagueStatusMap]}
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
      field: "players",
      headerName: "Jugadores",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Link href={`/admin/ligas/${params.id}`} passHref>
          <Button variant="contained" color="primary" size="small">
            Ver Liga
          </Button>
        </Link>
      ),
    },
  ];

  const rows = filteredLeagues.map((league) => ({
    id: league.id,
    name: league.name,
    status: league.status,
    players: `${league.players.length} jugadores`,
  }));

  return (
    <div>
      {/* Search input */}
      <div style={{ marginBottom: "1rem" }}>
        <TextField
          label="Buscar liga"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredLeagues.length === 0 ? (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <p>
            {searchTerm
              ? "No se encontraron ligas que coincidan."
              : "No hay ligas registradas."}
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
