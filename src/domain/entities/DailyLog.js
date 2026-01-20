import { Activity } from './Activity.js';

export class DailyLog {
  constructor(date, activities = {}) {
    this.date = date;
    this.activities = activities;
  }

  addActivity(activityType) {
    const current = this.activities[activityType];
    const newActivities = {
      ...this.activities,
      [activityType]: current ? current.increment() : new Activity(activityType),
    };
    return new DailyLog(this.date, newActivities);
  }

  removeActivity(activityType) {
    const current = this.activities[activityType];
    if (!current) {
      return this;
    }

    const newActivities = { ...this.activities };
    if (current.count > 1) {
      newActivities[activityType] = current.decrement();
    } else {
      delete newActivities[activityType];
    }
    return new DailyLog(this.date, newActivities);
  }

  hasActivities() {
    return Object.keys(this.activities).length > 0;
  }

  getActivityCount(activityType) {
    return this.activities[activityType]?.count || 0;
  }

  getAllActivities() {
    return Object.values(this.activities);
  }

  toJSON() {
    const result = {};
    Object.entries(this.activities).forEach(([type, activity]) => {
      result[type] = activity.count;
    });
    return result;
  }

  static fromJSON(date, json) {
    const activities = {};
    Object.entries(json).forEach(([type, count]) => {
      activities[type] = new Activity(type, count);
    });
    return new DailyLog(date, activities);
  }
}
