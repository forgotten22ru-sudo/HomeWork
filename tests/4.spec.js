import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// Переменные
const user = {
  name: faker.person.fullName(), // 'Allen Brown'
  password: faker.internet.password({ length: 10 }), // '89G1wJuBLbGziIs'
  email: faker.internet.email({ provider: 'example.fakerjs.dev' }), // 'Kassandra4@hotmail.com'
};
const url = 'https://realworld.qa.guru/';
const getRegistration = async (page, name, password, email, url) => {
  await page.goto(url);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
};

test('Пользователь может зарегистрироваться используя email и пароль', async ({ page }) => {
  getRegistration(page, user.name, user.password, user.email, url);
  await expect(page.getByRole('navigation')).toContainText(user.name);
});

test('Пользователь может изменить свое имя в профиле', async ({ page }) => {
  const jsonCopy = structuredClone(user);
  getRegistration(page, user.name, user.password, user.email, url);
  // сделать тест на изменение имени в профиле
  await expect(page.getByRole('navigation')).toContainText(user.name);
});
