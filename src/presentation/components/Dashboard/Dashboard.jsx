import React from 'react';
import { Calendar } from '../Calendar/Calendar';
import { ActivityTracker } from '../ActivityTracker/ActivityTracker';
import { Statistics } from '../Statistics/Statistics';
import { formatDate } from '../../utils/date-utils';

export const Dashboard = ({
  logsMap,
  todayLog,
  currentDate,
  statistics,
  onAddActivity,
  onRemoveActivity
}) => {
  return (
    <div className="max-w-[1400px] mx-auto h-screen flex flex-col p-5">
      <header className="text-center text-white mb-6">
        <h1 className="text-5xl mb-2.5 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]">Suivi d'apprentissage du japonais</h1>
        <p className="text-xl opacity-90">{formatDate(currentDate)}</p>
      </header>

      <div className="flex-1 grid grid-rows-2 gap-5 overflow-hidden">
        {/* Ligne du haut : Calendar + Statistics */}
        <div className="grid grid-cols-2 gap-5">
          <Calendar logsMap={logsMap} currentDate={currentDate} />
          <Statistics statistics={statistics} />
        </div>

        {/* Ligne du bas : ActivityTracker */}
        <ActivityTracker
          dailyLog={todayLog}
          onAddActivity={onAddActivity}
          onRemoveActivity={onRemoveActivity}
        />
      </div>
    </div>
  );
};
