import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';
import { TodoBuilder } from '../src/helpers/builders/todo.builder';

test.describe('работа с апи', () => {
  test('Получить один существующий todo', async ({ getToken }) => {
    const { api, token } = getToken;
    let resp = await api.todos.get(token);
    let todos = await resp.json(); // Преобразую ответ в JSON
    const listTodos = todos.todos;
    const randomIdIndex = Math.floor(Math.random() * listTodos.length); // выбираю случайный индекс todo
    const randomTodo = listTodos[randomIdIndex]; // выбираю todo по индексу
    const id = randomTodo.id;
    resp = await api.todos.get(token, id);
    todos = await resp.json();
    expect(resp.status()).toBe(200);
    expect(todos.todos[0]).toMatchObject({
      // Проверяю, что todo имеет 4 ключа и их значения соответствуют определенному типу
      id: expect.any(Number),
      title: expect.any(String),
      doneStatus: expect.any(Boolean),
      description: expect.any(String),
    });
  });

  test('Добавить новый todo', async ({ getToken }) => {
    const { api, token } = getToken;
    const todo = new TodoBuilder().withTitle().withDone().withDescription().build();
    let resp = await api.todos.post(token, todo);
    const body = await resp.json();
    expect(resp.status()).toBe(201);
    expect(body).toMatchObject({
      // Проверяю, что созданная todo имеет 4 ключа и их значения соответствуют определенному типу
      id: expect.any(Number),
      title: expect.any(String),
      doneStatus: true,
      description: expect.any(String),
    });
  });

  test('Изменить описание todo', async ({ getToken }) => {
    const { api, token } = getToken;
    const newtodo = new TodoBuilder().withDescription().build();
    const todolist = await api.todos.get(token); //Получаю список todos
    const listBody = await todolist.json(); //Получаю список todos в JSON
    const todos = listBody.todos;
    const randomIdIndex = Math.floor(Math.random() * todos.length); // выбираю случайный индекс todo
    const randomTodo = todos[randomIdIndex]; // выбираю todo по индексу
    const id = randomTodo.id;
    const originalBody = { ...randomTodo };
    let resp = await api.todos.postId(token, id, newtodo);
    const newBody = await resp.json();
    expect(resp.status()).toBe(200);
    expect(newBody).toMatchObject({
      // Проверяю, что в todo изменилось только описание
      id: originalBody.id,
      title: originalBody.title,
      doneStatus: originalBody.doneStatus,
      description: newBody.description,
    });
  });

  test('Получить список challenges', async ({ getToken }) => {
    const { api, token } = getToken;
    const resp = await api.challenges.get(token);
    const challenges = await resp.json(); // Преобразую ответ в JSON
    expect(resp.status()).toBe(200);
    challenges.challenges.forEach((challenge) => {
      expect(challenge).toMatchObject({
        // Проверяю, что todo имеет 4 ключа и их значения соответствуют определенному типу
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        status: expect.any(Boolean),
      });
    });
  });

  test('Удалить todo', async ({ getToken }) => {
    const { api, token } = getToken;
    const todo = new TodoBuilder().withTitle().withDone().withDescription().build();
    let resp = await api.todos.post(token, todo);
    const body = await resp.json();
    const id = body.id;
    resp = await api.todos.delete(token, id);
    expect(resp.status()).toBe(200);
  });
});
