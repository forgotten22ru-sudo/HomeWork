import { test, expect } from '@playwright/test';
import { Api } from '../src/services/api.services';

//let token;
//const url = 'https://apichallenges.eviltester.com/';
test.describe('работа с апи', () => {
  test('Получить Список челленджей', async ({ request }) => {
    const api = new Api(request);
    const token = await api.challenger.post();
    expect(token).toBeTruthy();
    const { body, header } = await api.challenges.get(token);
    //console.log(request);
    //console.log(body, header);
    expect(body.challenges.length).toBe(59);
    const todos = await api.todos.get(token);
    // console.log(todos);
  });
});
