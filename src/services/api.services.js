import { ChallengerService, ChallengesService, TodosServise } from './index';

export class Api {
  constructor(request) {
    this.request = request;
    this.challenger = new ChallengerService(request);
    this.challenges = new ChallengesService(request);
    this.todos = new TodosServise(request);
  }
}
