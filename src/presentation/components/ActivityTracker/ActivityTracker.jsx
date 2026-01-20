import React from 'react';
import { ActivityType, ActivityLabels } from '../../../domain/entities/Activity';
import { ActivityButton } from './ActivityButton';
import { ActivityBadge } from './ActivityBadge';
import { Separator } from '../ui/separator';

export const ActivityTracker = ({ dailyLog, onAddActivity, onRemoveActivity }) => {
  const activities = dailyLog ? dailyLog.getAllActivities() : [];

  const activityTypes = [
    ActivityType.NHK,
    ActivityType.ASAHI,
    ActivityType.DRAMA,
    ActivityType.ANIME,
    ActivityType.YOUTUBE,
    ActivityType.ANKI,
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {activityTypes.map(type => (
          <ActivityButton
            key={type}
            type={type}
            label={ActivityLabels[type]}
            onClick={() => onAddActivity(type)}
          />
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Activités sélectionnées</h3>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-muted rounded-lg">
          {activities.length === 0 ? (
            <div className="text-muted-foreground italic text-center p-4 w-full">
              Aucune activité sélectionnée
            </div>
          ) : (
            activities.map(activity => (
              <ActivityBadge
                key={activity.type}
                activity={activity}
                onClick={() => onRemoveActivity(activity.type)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
