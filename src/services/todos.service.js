import { test } from '@playwright/test';
export class TodosServise {
  constructor(request) {
    this.request = request;
    this.url = 'https://apichallenges.eviltester.com/';
  }
  async get(token) {
    return test.step('GET /todos', async (step) => {
      const resp = await this.request.get(`${this.url}todos`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });
      const body = await resp.json();
      return body;
    });
  }
}
