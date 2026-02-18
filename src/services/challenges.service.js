import { test } from '@playwright/test';
export class ChallengesService {
  constructor(request) {
    this.request = request;
  }
  async get(token) {
    return test.step('GET /challenges', async (step) => {
      const resp = await this.request.get(`/challenges`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });
      return await resp;
    });
  }
}
