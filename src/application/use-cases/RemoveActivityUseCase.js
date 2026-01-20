export class RemoveActivityUseCase {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(date, activityType) {
    const allLogs = await this.activityRepository.loadAll();
    const currentLog = allLogs[date];

    if (!currentLog) {
      return allLogs;
    }

    const updatedLog = currentLog.removeActivity(activityType);
    const updatedLogs = { ...allLogs };

    if (updatedLog.hasActivities()) {
      updatedLogs[date] = updatedLog;
    } else {
      delete updatedLogs[date];
    }

    await this.activityRepository.saveAll(updatedLogs);
    return updatedLogs;
  }
}
