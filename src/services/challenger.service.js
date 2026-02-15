import { test } from '@playwright/test';
export class ChallengerService {
  constructor(request) {
    this.request = request;
    this.url = 'https://apichallenges.eviltester.com/';
  }
  async post() {
    return test.step('POST /challenger', async (step) => {
      const resp = await this.request.post(`${this.url}challenger`);
      const headers = resp.headers();
      return headers['x-challenger'];
    });
  }
}
