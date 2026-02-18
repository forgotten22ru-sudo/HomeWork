import { test } from '@playwright/test';
export class ChallengerService {
  constructor(request) {
    this.request = request;
  }
  async post() {
    return test.step('POST /challenger', async (step) => {
      const resp = await this.request.post(`/challenger`);
      const headers = resp.headers();
      return headers['x-challenger'];
    });
  }
}
