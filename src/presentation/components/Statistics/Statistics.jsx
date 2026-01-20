import React from 'react';

export const Statistics = ({ statistics }) => {
  const formatVideoTime = () => {
    const { videoHours, videoMinutes } = statistics;
    if (videoHours === 0 && videoMinutes === 0) {
      return '0min';
    }
    if (videoHours === 0) {
      return `${videoMinutes}min`;
    }
    if (videoMinutes === 0) {
      return `${videoHours}h`;
    }
    return `${videoHours}h ${videoMinutes}min`;
  };

  const stats = [
    {
      label: "Jours d'affilée",
      value: statistics.maxStreak,
      icon: "🔥",
      color: "text-orange-500"
    },
    {
      label: "Articles lus",
      value: statistics.totalArticles,
      icon: "📰",
      color: "text-blue-500"
    },
    {
      label: "Heures de vidéo",
      value: formatVideoTime(),
      icon: "🎬",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-full">
      <h2 className="text-gray-800 mb-5 text-3xl text-center font-semibold">Statistiques</h2>

      <div className="flex flex-col gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="text-5xl">{stat.icon}</div>
            <div className="flex-1">
              <div className="text-gray-600 text-sm font-medium mb-1">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
