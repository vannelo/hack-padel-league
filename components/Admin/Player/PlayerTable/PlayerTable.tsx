'use client';

import { TextField } from '@mui/material';
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import { useState } from 'react';

import Button, { ButtonSize } from '@/components/UI/Button/Button';
import { genderMap, levelMap } from '@/constants/playerEnums';
import { TEXT } from '@/constants/text';
import { Player } from '@/types/player';

interface PlayerTableProps {
  players: Player[];
  onPlayerEdit: (playerId: string) => void;
}

export default function PlayerTable({
  players,
  onPlayerEdit,
}: PlayerTableProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: TEXT.admin.players.tableHeaders.name,
      flex: 1,
    },
    {
      field: 'email',
      headerName: TEXT.admin.players.tableHeaders.email,
      flex: 1,
    },
    {
      field: 'age',
      headerName: TEXT.admin.players.tableHeaders.age,
      width: 70,
    },
    {
      field: 'phone',
      headerName: TEXT.admin.players.tableHeaders.phone,
      flex: 1,
    },
    {
      field: 'gender',
      headerName: TEXT.admin.players.tableHeaders.gender,
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <span>{genderMap[params.value as keyof typeof genderMap]}</span>
      ),
    },
    {
      field: 'level',
      headerName: TEXT.admin.players.tableHeaders.level,
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <span>{levelMap[params.value as keyof typeof levelMap]}</span>
      ),
    },
    {
      field: 'actions',
      headerName: TEXT.admin.players.tableHeaders.actions,
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          onClick={() => onPlayerEdit(params.id as string)}
          size={ButtonSize.SMALL}
          label={TEXT.admin.players.tableHeaders.edit}
        />
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

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          label={TEXT.admin.players.searchPlaceholder}
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPlayers.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">
            {searchTerm
              ? TEXT.admin.players.noPlayersFound
              : TEXT.admin.players.noPlayersRegistered}
          </p>
        </div>
      ) : (
        <div className="h-[600px] w-full">
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
    </>
  );
}
