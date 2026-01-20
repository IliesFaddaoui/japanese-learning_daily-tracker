export const ActivityType = {
  NHK: 'nhk',
  ASAHI: 'asahi',
  DRAMA: 'drama',
  ANIME: 'anime',
  YOUTUBE: 'youtube',
  ANKI: 'anki',
};

export const ActivityLabels = {
  [ActivityType.NHK]: 'NHK Article Reading',
  [ActivityType.ASAHI]: 'Asahi Article Reading',
  [ActivityType.DRAMA]: 'Drama Watching',
  [ActivityType.ANIME]: 'Anime Watching',
  [ActivityType.YOUTUBE]: 'YouTube Video Watching',
  [ActivityType.ANKI]: 'Anki',
};

export class Activity {
  constructor(type, count = 1) {
    if (!Object.values(ActivityType).includes(type)) {
      throw new Error(`Invalid activity type: ${type}`);
    }
    if (count < 1) {
      throw new Error('Activity count must be at least 1');
    }
    this.type = type;
    this.count = count;
  }

  increment() {
    return new Activity(this.type, this.count + 1);
  }

  decrement() {
    if (this.count <= 1) {
      throw new Error('Cannot decrement activity count below 1');
    }
    return new Activity(this.type, this.count - 1);
  }

  getLabel() {
    return ActivityLabels[this.type];
  }
}
