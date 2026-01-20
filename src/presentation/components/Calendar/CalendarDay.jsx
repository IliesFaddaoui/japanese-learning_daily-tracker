import React from 'react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

export const CalendarDay = ({ day, isToday, hasActivity, onClick }) => {
  if (!day) {
    return <div className="bg-transparent" />;
  }

  const variant = isToday ? 'default' : 'ghost';
  const className = cn(
    "aspect-square font-semibold",
    hasActivity && !isToday && "text-green-600",
    !hasActivity && !isToday && "text-muted-foreground"
  );

  return (
    <Button
      variant={variant}
      size="sm"
      className={className}
      onClick={onClick}
      disabled={!hasActivity}
    >
      {day.dayNumber}
    </Button>
  );
};
