import React, { useState } from 'react';
import { CalendarDay } from './CalendarDay';
import { DayDetailsModal } from './DayDetailsModal';
import { getMonthData } from './calendar-utils';
import { getTodayDateString } from '../../utils/date-utils';

export const Calendar = ({ logsMap, currentDate }) => {
  const { year, month, monthName, weeks } = getMonthData(currentDate);
  const todayDateString = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(null);

  const dayHeaders = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

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
      <div className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-full flex flex-col">
        <h2 className="text-gray-800 mb-5 text-3xl text-center font-semibold">{monthName} {year}</h2>
        <div className="grid grid-cols-7 gap-2.5 flex-1">
          {dayHeaders.map(day => (
            <div key={day} className="text-center font-bold text-[#667eea] p-2.5 text-sm">
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
      </div>

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
