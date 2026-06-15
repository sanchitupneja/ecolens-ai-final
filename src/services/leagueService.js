/**
 * Leagues and Leaderboard Calculations Service.
 * Decouples ranking calculations from hooks.
 */

/**
 * Simulates user logging activity, updating points and recalculating ranks.
 * 
 * @param {Array<Object>} leaguesList - Current list of leaderboard members
 * @returns {Array<Object>} Sorted list with updated rankings
 */
export const updateLeaderboard = (leaguesList) => {
  const updated = leaguesList.map(member => {
    if (member.isUser) {
      return { ...member, points: member.points + 60, streak: true };
    }
    return member;
  });
  
  const sorted = [...updated].sort((a, b) => b.points - a.points);
  return sorted.map((member, idx) => ({ ...member, rank: idx + 1 }));
};

export default {
  updateLeaderboard,
};
