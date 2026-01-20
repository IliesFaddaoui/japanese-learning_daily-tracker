import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Hourglass, Newspaper, Film } from 'lucide-react';

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
      Icon: Hourglass,
      color: "text-orange-500"
    },
    {
      label: "Articles lus",
      value: statistics.totalArticles,
      Icon: Newspaper,
      color: "text-blue-500"
    },
    {
      label: "Heures de vidéo",
      value: formatVideoTime(),
      Icon: Film,
      color: "text-purple-500"
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Statistiques</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-muted rounded-lg p-6 flex items-center gap-4 hover:bg-muted/80 transition-colors">
            <stat.Icon className="text-black" size={48} strokeWidth={2} />
            <div className="flex-1">
              <div className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
