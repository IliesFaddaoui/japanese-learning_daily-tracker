export const calculateStatistics = (logsMap) => {
  const dates = Object.keys(logsMap).sort();

  // Calculate current streak (consecutive days up to today/yesterday)
  let currentStreak = 0;

  if (dates.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastDate = new Date(dates[dates.length - 1]);
    lastDate.setHours(0, 0, 0, 0);

    // Check if last activity day is today or yesterday
    const daysSinceLastActivity = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (daysSinceLastActivity <= 1) {
      // Count backwards from last day
      currentStreak = 1;

      for (let i = dates.length - 2; i >= 0; i--) {
        const prevDate = new Date(dates[i]);
        const nextDate = new Date(dates[i + 1]);
        const diffDays = Math.floor((nextDate - prevDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  // Calculate total articles read (NHK + Asahi)
  let totalArticles = 0;

  // Calculate video hours watched
  let totalVideoMinutes = 0;

  Object.values(logsMap).forEach(dailyLog => {
    const activities = dailyLog.toJSON();

    // Articles
    totalArticles += (activities.nhk || 0) + (activities.asahi || 0);

    // Videos (in minutes)
    totalVideoMinutes += (activities.anime || 0) * 20;
    totalVideoMinutes += (activities.drama || 0) * 40;
    totalVideoMinutes += (activities.youtube || 0) * 15;
  });

  const hours = Math.floor(totalVideoMinutes / 60);
  const minutes = totalVideoMinutes % 60;

  return {
    maxStreak: currentStreak,
    totalArticles,
    videoHours: hours,
    videoMinutes: minutes
  };
};
