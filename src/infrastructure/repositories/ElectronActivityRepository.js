import { ActivityRepository } from '../../domain/repositories/ActivityRepository.js';
import { DailyLog } from '../../domain/entities/DailyLog.js';

export class ElectronActivityRepository extends ActivityRepository {
  constructor(electronAPI) {
    super();
    this.electronAPI = electronAPI;
  }

  async loadAll() {
    try {
      const data = await this.electronAPI.loadActivities();
      const logsMap = {};

      Object.entries(data).forEach(([date, activitiesJson]) => {
        logsMap[date] = DailyLog.fromJSON(date, activitiesJson);
      });

      return logsMap;
    } catch (error) {
      console.error('Error loading activities:', error);
      return {};
    }
  }

  async saveAll(logsMap) {
    try {
      const data = {};
      Object.entries(logsMap).forEach(([date, dailyLog]) => {
        data[date] = dailyLog.toJSON();
      });

      await this.electronAPI.saveActivities(data);
    } catch (error) {
      console.error('Error saving activities:', error);
      throw error;
    }
  }

  async getLogForDate(date) {
    const allLogs = await this.loadAll();
    return allLogs[date] || new DailyLog(date);
  }

  async saveLogForDate(date, dailyLog) {
    const allLogs = await this.loadAll();
    allLogs[date] = dailyLog;
    await this.saveAll(allLogs);
  }
}
