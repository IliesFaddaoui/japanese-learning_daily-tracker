import { useState, useEffect, useCallback, useMemo } from 'react';
import { getTodayDateString } from '../utils/date-utils';
import { calculateStatistics } from '../utils/statistics-utils';

export const useActivities = (
  loadActivitiesUseCase,
  addActivityUseCase,
  removeActivityUseCase
) => {
  const [logsMap, setLogsMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const todayDateString = getTodayDateString();
  const todayLog = logsMap[todayDateString];

  const statistics = useMemo(() => {
    return calculateStatistics(logsMap);
  }, [logsMap]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setIsLoading(true);
        const data = await loadActivitiesUseCase.execute();
        setLogsMap(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load activities:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, [loadActivitiesUseCase]);

  const addActivity = useCallback(
    async (activityType) => {
      try {
        const updatedLogs = await addActivityUseCase.execute(todayDateString, activityType);
        setLogsMap(updatedLogs);
        setError(null);
      } catch (err) {
        console.error('Failed to add activity:', err);
        setError(err.message);
      }
    },
    [addActivityUseCase, todayDateString]
  );

  const removeActivity = useCallback(
    async (activityType) => {
      try {
        const updatedLogs = await removeActivityUseCase.execute(todayDateString, activityType);
        setLogsMap(updatedLogs);
        setError(null);
      } catch (err) {
        console.error('Failed to remove activity:', err);
        setError(err.message);
      }
    },
    [removeActivityUseCase, todayDateString]
  );

  return {
    logsMap,
    todayLog,
    statistics,
    isLoading,
    error,
    addActivity,
    removeActivity,
  };
};
