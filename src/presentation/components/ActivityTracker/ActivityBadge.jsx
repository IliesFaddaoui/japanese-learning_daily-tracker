import React from 'react';

export const ActivityBadge = ({ activity, onClick }) => {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-full text-sm font-medium cursor-pointer transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:scale-95 hover:opacity-80"
      onClick={onClick}
    >
      <span>{activity.getLabel()}</span>
      {activity.count > 1 && (
        <span className="bg-white/30 px-2 py-0.5 rounded-lg font-bold text-sm">{activity.count}</span>
      )}
    </div>
  );
};
