import React from 'react';
import { Badge } from '../ui/badge';

export const ActivityBadge = ({ activity, onClick }) => {
  return (
    <Badge
      variant="secondary"
      className="cursor-pointer transition-colors px-4 py-2 text-sm gap-2 bg-red-600 text-white hover:bg-red-700 border-red-600"
      onClick={onClick}
    >
      <span>{activity.getLabel()}</span>
      {activity.count > 1 && (
        <span className="ml-2 bg-white rounded-full px-2 py-0.5 text-xs font-semibold text-red-600">
          {activity.count}
        </span>
      )}
    </Badge>
  );
};
