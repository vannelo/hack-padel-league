"use client";

import { useState } from "react";
import Link from "next/link";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip, Button } from "@mui/material";
import { Tournament } from "@/types/tournament";
import { tournamentStatusMap } from "@/constants/tournamentEnums";
import { TournamentStatus } from "@prisma/client";

export default function TournamentTable({
  tournaments,
}: {
  tournaments: Tournament[];
}) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={tournamentStatusMap[params.value as TournamentStatus]}
          color={
            params.value === TournamentStatus.Upcoming
              ? "primary"
              : params.value === TournamentStatus.InProgress
              ? "secondary"
              : "default"
          }
        />
      ),
    },
    {
      field: "availableCourts",
      headerName: "Canchas",
      flex: 1,
    },
    {
      field: "couples",
      headerName: "Parejas",
      flex: 2,
      renderCell: (params: GridRenderCellParams) => <p>{params.value}</p>,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <p>{params.value}</p>,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Link href={`/admin/torneos/${params.id}`} passHref>
          <Button variant="contained" color="primary" size="small">
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  const rows = tournaments.map((tournament) => ({
    id: tournament.id,
    name: tournament.name,
    availableCourts: tournament.availableCourts,
    status: tournament.status,
    type: tournament.type,
    couples: `${tournament.couples.length} parejas`,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[5, 10, 20]}
      pagination
      disableRowSelectionOnClick
    />
  );
}
