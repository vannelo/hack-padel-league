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
      tableHeaders: {
        name: 'Nombre',
        status: 'Estado',
        players: 'Jugadores',
        actions: 'Acciones',
        viewLeague: 'Ver Liga',
      },
    },
  },
}
