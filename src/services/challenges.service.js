import { test } from '@playwright/test';
export class ChallengesService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }
  async get(token) {
    return test.step('GET /challenges', async (step) => {
      const resp = await this.request.get(`${this.baseURL}challenges`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });
      return await resp;
    });
  }
}
