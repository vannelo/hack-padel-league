'use client';

import { TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';
import { useState } from 'react';

import Button, { ButtonSize } from '@/components/UI/Button/Button';
import StatusBadge from '@/components/UI/StatusBadge/StatusBadge';
import {
  tournamentStatusMap,
  tournamentTypeMap,
} from '@/constants/tournamentEnums';
import { Tournament } from '@/types/tournament';

export default function TournamentTable({
  tournaments,
}: {
  tournaments: Tournament[];
}) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', flex: 1 },
    {
      field: 'status',
      headerName: 'Estado',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <StatusBadge status={params.value} statusMap={tournamentStatusMap} />
      ),
    },
    {
      field: 'availableCourts',
      headerName: 'Canchas',
      flex: 1,
    },
    {
      field: 'couples',
      headerName: 'Parejas',
      flex: 2,
      renderCell: (params: GridRenderCellParams) => <p>{params.value}</p>,
    },
    {
      field: 'type',
      headerName: 'Tipo',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <p>
          {tournamentTypeMap[params.value as keyof typeof tournamentTypeMap]}
        </p>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Link href={`/admin/torneos/${params.id}`} passHref>
          <Button size={ButtonSize.SMALL} label=" Ver Torneo" />
        </Link>
      ),
    },
  ];

  const rows = filteredTournaments.map((tournament) => ({
    id: tournament.id,
    name: tournament.name,
    availableCourts: tournament.availableCourts,
    status: tournament.status,
    type: tournament.type,
    couples: `${tournament.couples.length} parejas`,
  }));

  return (
    <div>
      {/* Search input */}
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label="Buscar torneo"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredTournaments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <p>No se encontraron torneos que coincidan.</p>
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          pagination
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
}
