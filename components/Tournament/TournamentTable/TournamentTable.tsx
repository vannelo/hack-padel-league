"use client";

import { useState } from "react";
import Link from "next/link";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip, Button } from "@mui/material";

export default function TournamentTable({
  tournaments,
}: {
  // eslint-disable-next-line
  tournaments: any[];
}) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
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
      field: "couples",
      headerName: "Couples",
      flex: 2,
      renderCell: (params: GridRenderCellParams) =>
        params.value.length > 0 ? (
          <ul className="list-disc list-inside">
            {/*  eslint-disable-next-line */}
            {params.value.map((couple: any) => (
              <li key={couple.id} className="mb-1">
                {couple.player1?.name || "Player 1"} &{" "}
                {couple.player2?.name || "Player 2"}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-500">No couples assigned</span>
        ),
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
    status: tournament.status,
    couples: tournament.couples,
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
