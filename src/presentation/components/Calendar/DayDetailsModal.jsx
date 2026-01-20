import React, { useEffect, useRef } from 'react';
import { ActivityLabels } from '../../../domain/entities/Activity';

export const DayDetailsModal = ({ dailyLog, date, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!dailyLog) return null;

  const activities = dailyLog.getAllActivities();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Activités du jour
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          {formatDate(date)}
        </p>

        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.type}
              className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-800 font-medium">
                {activity.getLabel()}
              </span>
              <span className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-3 py-1 rounded-full text-sm font-bold">
                {activity.count}
              </span>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            Aucune activité enregistrée
          </div>
        )}
      </div>
    </div>
  );
};
