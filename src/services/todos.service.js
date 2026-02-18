import { test } from '@playwright/test';
export class TodosService {
  constructor(request) {
    this.request = request;
    this.url = 'https://apichallenges.eviltester.com/';
  }
  async get(token, id) {
    const endpoint = id ? `todos/${id}` : 'todos';
    return test.step(`get/todos/${endpoint}`, async (step) => {
      const resp = await this.request.get(`${this.url}${endpoint}`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });

      return await resp;
    });
  }

  async post(token, payload, type = 'application/json') {
    return test.step('post/todos', async (step) => {
      const resp = await this.request.post(`${this.url}todos`, {
        headers: {
          'X-CHALLENGER': token,
          'content-type': type,
        },
        data: payload,
      });
      return await resp;
    });
  }

  async postId(token, id, payload, type = 'application/json') {
    return test.step('post/todos/id', async (step) => {
      const resp = await this.request.post(`${this.url}todos/${id}`, {
        headers: {
          'X-CHALLENGER': token,
          'content-type': type,
        },
        data: payload,
      });
      return await resp;
    });
  }

  async delete(token, id) {
    const endpoint = id ? `todos/${id}` : 'todos';
    return test.step(`delete/todos/${endpoint}`, async (step) => {
      const resp = await this.request.delete(`${this.url}${endpoint}`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });

      return await resp;
    });
  }
}
