import React, { useState } from 'react';
import { Calendar } from '../Calendar/Calendar';
import { ActivityTracker } from '../ActivityTracker/ActivityTracker';
import { Statistics } from '../Statistics/Statistics';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { formatDate } from '../../utils/date-utils';

export const Dashboard = ({
  logsMap,
  todayLog,
  currentDate,
  statistics,
  onAddActivity,
  onRemoveActivity
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto h-screen flex flex-col p-5">
      <header className="text-center text-white mb-6">
        <h1 className="text-5xl mb-2.5 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]">Suivi d'apprentissage du japonais</h1>
        <p className="text-xl opacity-90">{formatDate(currentDate)}</p>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-5 overflow-hidden mb-5">
        <Calendar logsMap={logsMap} currentDate={currentDate} />
        <Statistics statistics={statistics} />
      </div>

      <Button
        size="lg"
        className="w-full max-w-md mx-auto"
        onClick={() => setIsDrawerOpen(true)}
      >
        Ajouter des activités
      </Button>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Activités du jour</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <ActivityTracker
              dailyLog={todayLog}
              onAddActivity={onAddActivity}
              onRemoveActivity={onRemoveActivity}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
