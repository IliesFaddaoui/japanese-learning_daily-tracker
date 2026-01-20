import { DailyLog } from '../../domain/entities/DailyLog.js';

export class AddActivityUseCase {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(date, activityType) {
    const allLogs = await this.activityRepository.loadAll();
    const currentLog = allLogs[date];

    const updatedLog = currentLog
      ? currentLog.addActivity(activityType)
      : new DailyLog(date).addActivity(activityType);

    const updatedLogs = {
      ...allLogs,
      [date]: updatedLog,
    };

    await this.activityRepository.saveAll(updatedLogs);
    return updatedLogs;
  }
}
