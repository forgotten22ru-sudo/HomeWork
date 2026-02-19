import { test } from '@playwright/test';
export class ChallengerService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }
  async post() {
    return test.step('POST /challenger', async (step) => {
      const resp = await this.request.post(`${this.baseURL}challenger`);
      const headers = resp.headers();
      return headers['x-challenger'];
    });
  }
}
