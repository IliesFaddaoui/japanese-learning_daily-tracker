import React, { useMemo } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useActivities } from './hooks/useActivities';
import { ElectronActivityRepository } from '../infrastructure/repositories/ElectronActivityRepository';
import { LoadActivitiesUseCase } from '../application/use-cases/LoadActivitiesUseCase';
import { AddActivityUseCase } from '../application/use-cases/AddActivityUseCase';
import { RemoveActivityUseCase } from '../application/use-cases/RemoveActivityUseCase';

export const App = () => {
  const repository = useMemo(
    () => new ElectronActivityRepository(window.electronAPI),
    []
  );

  const loadActivitiesUseCase = useMemo(
    () => new LoadActivitiesUseCase(repository),
    [repository]
  );

  const addActivityUseCase = useMemo(
    () => new AddActivityUseCase(repository),
    [repository]
  );

  const removeActivityUseCase = useMemo(
    () => new RemoveActivityUseCase(repository),
    [repository]
  );

  const {
    logsMap,
    todayLog,
    statistics,
    isLoading,
    error,
    addActivity,
    removeActivity,
  } = useActivities(
    loadActivitiesUseCase,
    addActivityUseCase,
    removeActivityUseCase
  );

  const currentDate = new Date();

  if (isLoading) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>
        Erreur: {error}
      </div>
    );
  }

  return (
    <Dashboard
      logsMap={logsMap}
      todayLog={todayLog}
      currentDate={currentDate}
      statistics={statistics}
      onAddActivity={addActivity}
      onRemoveActivity={removeActivity}
    />
  );
};
