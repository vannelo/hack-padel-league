export const TEXT = {
  admin: {
    players: {
      errorFetching: 'Error al obtener jugadores',
      playerCreated: (name: string) => `Jugador ${name} creado exitosamente`,
      playerUpdated: 'Jugador actualizado correctamente',
      playerDeleted: 'Jugador eliminado correctamente',
      createPlayer: 'Crear Jugador',
      editPlayer: 'Editar jugador',
      playersTitle: 'Jugadores',
      errorCreating: 'Error al crear jugador',
      submitButton: {
        saving: 'Guardando...',
        create: 'Crear',
      },
    },
    leagues: {
      errorFetching: 'Error al obtener ligas',
      createLeague: 'Crear Liga',
      leaguesTitle: 'Ligas',
      leagueCreated: (name: string) => `Liga "${name}" creada exitosamente`,
      errorCreating: 'Error al crear liga',
      submitButton: {
        saving: 'Creando...',
        create: 'Crear',
      },
    },
  },
}
