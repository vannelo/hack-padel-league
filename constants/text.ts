export const TEXT = {
  admin: {
    players: {
      errorFetching: 'Error al obtener jugadores',
      playerCreated: (name: string) => `Jugador ${name} creado exitosamente`,
      playerUpdated: (name: string) =>
        `Jugador ${name} ha sido actualizado exitosamente.`,
      playerDeleted: (name: string) =>
        `Jugador ${name} ha sido eliminado exitosamente.`,
      createPlayer: 'Crear Jugador',
      editPlayer: 'Editar jugador',
      playersTitle: 'Jugadores',
      errorCreating: 'Error al crear jugador',
      errorUpdating:
        'Error al actualizar el jugador. Por favor, intenta de nuevo.',
      errorDeleting:
        'Error al eliminar el jugador. Por favor, intenta de nuevo.',
      confirmDelete: (name: string) =>
        `¿Estás seguro de que quieres eliminar a ${name}?`,
      searchPlaceholder: 'Buscar jugador',
      noPlayersFound: 'No se encontraron jugadores que coincidan.',
      noPlayersRegistered: 'No hay jugadores registrados.',
      submitButton: {
        create: 'Crear',
        creating: 'Creando...',
        update: 'Actualizar',
        updating: 'Actualizando...',
        delete: 'Eliminar',
      },
      tableHeaders: {
        name: 'Nombre',
        email: 'Email',
        age: 'Edad',
        phone: 'Teléfono',
        gender: 'Género',
        level: 'Nivel',
        actions: 'Acciones',
        edit: 'Editar',
      },
    },
    leagues: {
      errorFetching: 'Error al obtener ligas',
      errorFetchingLeague: 'Error al obtener liga',
      createLeague: 'Crear Liga',
      leaguesTitle: 'Ligas',
      leagueCreated: (name: string) => `Liga "${name}" creada exitosamente`,
      errorCreating: 'Error al crear liga',
      searchPlaceholder: 'Buscar liga',
      noLeaguesFound: 'No se encontraron ligas que coincidan.',
      noLeaguesRegistered: 'No hay ligas registradas.',
      submitButton: {
        saving: 'Creando...',
        create: 'Crear',
      },
      addPlayer: 'Agregar Jugador',
      tableHeaders: {
        name: 'Nombre',
        status: 'Estado',
        players: 'Jugadores',
        actions: 'Acciones',
        viewLeague: 'Ver Liga',
      },
      viewLeagueLink: (id: string) => `/admin/ligas/${id}`,
      tablePlayersLength: (players: number) => `${players} jugadores`,
      leagueHeader: {
        startLeagueSuccess: '¡Liga iniciada con éxito!',
        startLeagueError: 'Ocurrió un error al iniciar la liga.',
        startLeagueButton: (isLoading: boolean) =>
          isLoading ? 'Iniciando...' : 'Iniciar Liga',
        leagueStartConditions:
          'La liga solo puede iniciarse con al menos 4 jugadores activos y un número par de jugadores',
        viewLeagueLink: (id: string) => `/ligas/${id}`,
      },
      ranking: {
        title: 'RANKING',
        playerHeader: 'Jugador',
        pointsHeader: 'Puntos',
        noPlayersAssigned: 'No hay jugadores asignados a esta liga.',
        updateScoreSuccess: 'Puntuación actualizada correctamente',
        updateScoreError: 'Error al actualizar la puntuación',
        saveButton: (isLoading: boolean) =>
          isLoading ? 'Guardando...' : 'Guardar',
        selectPlayerLabel: 'Jugador',
        selectPlayerPlaceholder: '-- Selecciona un Jugador --',
        selectPlayerError: 'Por favor, seleccione un jugador.',
        noAvailablePlayers: 'No hay jugadores disponibles',
        playerAdded: 'Jugador añadido a la liga correctamente',
        playerAddError: 'Error al añadir jugador a la liga',
        addPlayer: 'Añadir Jugador a la Liga',
        addingPlayer: 'Añadiendo...',
      },
      rounds: {
        title: 'JORNADAS',
        goToTournament: 'Ir al torneo',
        couplesTitle: 'Parejas',
        winnersTitle: 'Ganadores',
        noRounds:
          'Las jornadas serán creadas una vez que se haya iniciado la liga.',
        roundNumber: (number: number) => `Jornada ${number}`,
      },
    },
  },
}
