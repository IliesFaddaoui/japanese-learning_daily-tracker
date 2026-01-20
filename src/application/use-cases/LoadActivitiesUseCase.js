export class LoadActivitiesUseCase {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute() {
    return await this.activityRepository.loadAll();
  }
}
