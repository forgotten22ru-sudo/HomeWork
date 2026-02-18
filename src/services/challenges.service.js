import { test } from '@playwright/test';
export class ChallengesService {
  constructor(request) {
    this.request = request;
    this.url = process.env.API_URL;
  }
  async get(token) {
    return test.step('GET /challenges', async (step) => {
      const resp = await this.request.get(`${this.url}challenges`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });
      return await resp;
    });
  }
}
