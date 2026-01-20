export const calculateStatistics = (logsMap) => {
  const dates = Object.keys(logsMap).sort();

  // Calculer le streak maximum (jours d'affilée)
  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prevDate = new Date(dates[i - 1]);
      const currDate = new Date(dates[i]);
      const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
  }
  maxStreak = Math.max(maxStreak, currentStreak);

  // Calculer le nombre total d'articles lus (NHK + Asahi)
  let totalArticles = 0;

  // Calculer les heures de vidéo regardées
  let totalVideoMinutes = 0;

  Object.values(logsMap).forEach(dailyLog => {
    const activities = dailyLog.toJSON();

    // Articles
    totalArticles += (activities.nhk || 0) + (activities.asahi || 0);

    // Vidéos (en minutes)
    totalVideoMinutes += (activities.anime || 0) * 20;
    totalVideoMinutes += (activities.drama || 0) * 40;
    totalVideoMinutes += (activities.youtube || 0) * 15;
  });

  const hours = Math.floor(totalVideoMinutes / 60);
  const minutes = totalVideoMinutes % 60;

  return {
    maxStreak,
    totalArticles,
    videoHours: hours,
    videoMinutes: minutes
  };
};
