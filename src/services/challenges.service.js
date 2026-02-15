import { test } from '@playwright/test';
export class ChallengesService {
  constructor(request) {
    this.request = request;
    this.url = 'https://apichallenges.eviltester.com/';
  }
  async get(token) {
    return test.step('GET /challenges', async (step) => {
      const resp = await this.request.get(`${this.url}challenges`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });
      const body = await resp.json();
      const header = await resp.json();
      return { body, header };
    });
  }
}
