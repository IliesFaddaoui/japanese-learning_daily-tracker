import React from 'react';

export const CalendarDay = ({ day, isToday, hasActivity, onClick }) => {
  if (!day) {
    return <div className="bg-transparent" />;
  }

  const baseClasses = "aspect-square flex items-center justify-center rounded-xl bg-gray-100 font-semibold text-base transition-all duration-300";

  let colorClasses = "";
  let interactionClasses = "";

  if (isToday) {
    colorClasses = "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)]";
  } else if (hasActivity) {
    colorClasses = "text-green-500";
    interactionClasses = "cursor-pointer hover:scale-105 hover:shadow-md";
  } else {
    colorClasses = "text-gray-800";
  }

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${interactionClasses}`}
      onClick={onClick}
    >
      {day.dayNumber}
    </div>
  );
};
