import React from 'react';
import { Badge } from '../ui/badge';

export const ActivityBadge = ({ activity, onClick }) => {
  return (
    <Badge
      variant="secondary"
      className="cursor-pointer transition-colors px-4 py-2 text-sm gap-2 bg-green-700 text-white hover:bg-green-800 border-green-700"
      onClick={onClick}
    >
      <span>{activity.getLabel()}</span>
      {activity.count > 1 && (
        <span className="ml-2 bg-white/30 rounded-full px-2 py-0.5 text-xs font-semibold">
          {activity.count}
        </span>
      )}
    </Badge>
  );
};
