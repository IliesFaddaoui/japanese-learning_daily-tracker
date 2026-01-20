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
    <div className="max-w-[1400px] mx-auto min-h-screen flex flex-col p-5">
      <header className="text-center text-red-400 mb-6">
        <h1 className="text-3xl md:text-5xl mb-2.5">Japanese Learning Tracker</h1>
        <p className="text-lg md:text-xl opacity-90">{formatDate(currentDate)}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <Calendar logsMap={logsMap} currentDate={currentDate} />
        <Statistics statistics={statistics} />
      </div>

      <div className="flex-1 lg:mb-0 mb-24"></div>

      <Button
        size="lg"
        className="fixed lg:static bottom-4 left-4 right-4 lg:w-auto lg:max-w-md mx-auto lg:mb-5 rounded-md shadow-lg lg:shadow-sm z-50"
        onClick={() => setIsDrawerOpen(true)}
      >
        Add Activities
      </Button>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Today's Activities</DrawerTitle>
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
