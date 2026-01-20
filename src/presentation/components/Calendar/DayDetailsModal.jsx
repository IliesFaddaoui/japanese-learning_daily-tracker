import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Badge } from '../ui/badge';

export const DayDetailsModal = ({ dailyLog, date, onClose }) => {
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
    <Dialog open={!!dailyLog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activités du jour</DialogTitle>
          <DialogDescription>
            {formatDate(date)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {activities.map((activity) => (
            <div
              key={activity.type}
              className="flex items-center justify-between bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors"
            >
              <span className="font-medium">
                {activity.getLabel()}
              </span>
              <Badge variant="default">
                {activity.count}
              </Badge>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            Aucune activité enregistrée
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
