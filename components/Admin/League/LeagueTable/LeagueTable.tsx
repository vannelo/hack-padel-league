'use client';

import { TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';
import { useState } from 'react';

import Button, { ButtonSize } from '@/components/UI/Button/Button';
import StatusBadge from '@/components/UI/StatusBadge/StatusBadge';
import { leagueStatusMap } from '@/constants/leagueEnums';
import { TEXT } from '@/constants/text';
import { League } from '@/types/league';

interface LeagueTableProps {
  leagues: League[];
}

export default function LeagueTable({ leagues }: LeagueTableProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: TEXT.admin.leagues.tableHeaders.name,
      flex: 1,
    },
    {
      field: 'status',
      headerName: TEXT.admin.leagues.tableHeaders.status,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <StatusBadge status={params.value} statusMap={leagueStatusMap} />
      ),
    },
    {
      field: 'players',
      headerName: TEXT.admin.leagues.tableHeaders.players,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: TEXT.admin.leagues.tableHeaders.actions,
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          href={TEXT.admin.leagues.viewLeagueLink(params.id as string)}
          passHref
        >
          <Button
            size={ButtonSize.SMALL}
            label={TEXT.admin.leagues.tableHeaders.viewLeague}
          />
        </Link>
      ),
    },
  ];

  const rows = filteredLeagues.map((league) => ({
    id: league.id,
    name: league.name,
    status: league.status,
    players: TEXT.admin.leagues.tablePlayersLength(league.players.length),
  }));

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label={TEXT.admin.leagues.searchPlaceholder}
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredLeagues.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">
            {searchTerm
              ? TEXT.admin.leagues.noLeaguesFound
              : TEXT.admin.leagues.noLeaguesRegistered}
          </p>
        </div>
      ) : (
        <div className="h-[600px] w-full">
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
    </>
  );
}
