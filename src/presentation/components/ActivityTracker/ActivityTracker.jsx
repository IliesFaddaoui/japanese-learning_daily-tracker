import React from 'react';
import { ActivityType, ActivityLabels } from '../../../domain/entities/Activity';
import { ActivityButton } from './ActivityButton';
import { ActivityBadge } from './ActivityBadge';

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
    <div className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-full flex flex-col overflow-hidden">
      <h2 className="text-gray-800 mb-5 text-3xl font-semibold">Activités du jour</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-8">
        {activityTypes.map(type => (
          <ActivityButton
            key={type}
            type={type}
            label={ActivityLabels[type]}
            onClick={() => onAddActivity(type)}
          />
        ))}
      </div>

      <div className="border-t-2 border-gray-200 pt-5 flex-1 flex flex-col overflow-hidden">
        <h3 className="text-gray-600 mb-4 text-xl">Activités sélectionnées</h3>
        <div className="flex flex-wrap gap-2.5 min-h-[60px] p-4 bg-gray-50 rounded-xl overflow-y-auto">
          {activities.length === 0 ? (
            <div className="text-gray-400 italic text-center p-5 w-full">Aucune activité sélectionnée</div>
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
