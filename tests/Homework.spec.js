import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegistrationPage } from '../src/pages/registration.page';
import { HomePage } from '../src/pages/home.page';

// Переменные
const user = {
  name: faker.person.fullName(), // 'Allen Brown'
  password: faker.internet.password({ length: 10 }), // '89G1wJuBLbGziIs'
  email: faker.internet.email({ provider: 'example.fakerjs.dev' }), // 'Kassandra4@hotmail.com'
};
const url = 'https://realworld.qa.guru/';

test.only('Пользователь может зарегистрироваться используя email и пароль Page Object', async ({
  page,
}) => {
  const { name, password, email } = user;

  const mainPage = new MainPage(page);
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);

  await mainPage.open(url);
  await mainPage.gotoRegister();
  await registrationPage.register(password, email, name);

  await expect(homePage.profileName).toContainText(user.name);
});

test('Пользователь может изменить свое имя в профиле', async ({ page }) => {
  const jsonCopy = structuredClone(user);
  getRegistration(page, user.name, user.password, user.email, url);
  // сделать тест на изменение имени в профиле
  await expect(page.getByRole('navigation')).toContainText(user.name);
});
