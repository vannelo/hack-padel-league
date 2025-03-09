export const PUSHER_VALUES = {
  triggers: {
    scoreUpdate: {
      channel: (tournamentId: string) => `tournament-${tournamentId}`,
      event: 'score-updated',
    },
  },
};
