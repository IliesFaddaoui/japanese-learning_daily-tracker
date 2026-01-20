import React, { useState } from 'react';
import { CalendarDay } from './CalendarDay';
import { DayDetailsModal } from './DayDetailsModal';
import { getMonthData } from './calendar-utils';
import { getTodayDateString } from '../../utils/date-utils';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export const Calendar = ({ logsMap, currentDate }) => {
  const { year, month, monthName, weeks } = getMonthData(currentDate);
  const todayDateString = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(null);

  const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleDayClick = (dateString) => {
    if (logsMap[dateString]?.hasActivities()) {
      setSelectedDate(dateString);
    }
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl text-center">{monthName} {year}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="grid grid-cols-7 gap-2">
            {dayHeaders.map(day => (
              <div key={day} className="text-center font-bold text-primary p-2 text-sm">
                {day}
              </div>
            ))}
            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <CalendarDay
                  key={`${weekIndex}-${dayIndex}`}
                  day={day}
                  isToday={day?.dateString === todayDateString}
                  hasActivity={day ? logsMap[day.dateString]?.hasActivities() : false}
                  onClick={() => day && handleDayClick(day.dateString)}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <DayDetailsModal
          dailyLog={logsMap[selectedDate]}
          date={selectedDate}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
