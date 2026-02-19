import { test } from '@playwright/test';
export class TodosService {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }
  async get(token, id) {
    const endpoint = id ? `todos/${id}` : 'todos';
    return test.step(`get/todos/${endpoint}`, async (step) => {
      const resp = await this.request.get(`${this.baseURL}${endpoint}`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });

      return await resp;
    });
  }

  async post(token, payload, type = 'application/json') {
    return test.step('post/todos', async (step) => {
      const resp = await this.request.post(`${this.baseURL}todos`, {
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
      const resp = await this.request.post(`${this.baseURL}todos/${id}`, {
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
      const resp = await this.request.delete(`${this.baseURL}${endpoint}`, {
        headers: {
          'X-CHALLENGER': token,
        },
      });

      return await resp;
    });
  }
}
