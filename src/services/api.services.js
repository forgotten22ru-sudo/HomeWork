import { ChallengerService, ChallengesService, TodosService } from './index';

export class Api {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
    this.challenger = new ChallengerService(request, baseURL);
    this.challenges = new ChallengesService(request, baseURL);
    this.todos = new TodosService(request, baseURL);
  }
}
