import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegistrationPage } from '../src/pages/registration.page';
import { HomePage } from '../src/pages/home.page';
import { CreateArticlePage } from '../src/pages/createArticle.page';
import { ViewArticlePage } from '../src/pages/viewArticle.page';
import { EditArticlePage } from '../src/pages/editArticle.page';
import { SettingsPage } from '../src/pages/settings.page';
import { LogInPage } from '../src/pages/logIn.page';

// Переменные

//Данные для пользователя
const user = {
  name: faker.person.fullName(), // Генерация Имени
  password: faker.internet.password({ length: 10 }), // Генерим пароль
  email: faker.internet.email({ provider: 'example.fakerjs.dev' }), // Генерим почту
};

//Адрес
const url = 'https://realworld.qa.guru/';

//Данные для заполнения статьи
const newArticle = {
  title: faker.string.alpha({ length: { min: 5, max: 15 } }) /* Генерирую заголовок
  на английском 5-15 символов*/,
  description: faker.string.alpha({ length: { min: 15, max: 50 } }), // Генерю описание
  body: faker.string.alphanumeric({ length: { min: 50, max: 150 } }), // Генерю текст статьи
  tag: faker.string.alpha({ length: { min: 3, max: 8 } }), // Генерим тэги
};

//Тесты для заполнения тестовыми данными
//Регистрация (нужна всегда)
test.beforeEach('Регистрация пользователя', async ({ page }) => {
  const mainPage = new MainPage(page);
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);
  await mainPage.open(url);
  await mainPage.gotoRegister();
  await registrationPage.register(user.name, user.password, user.email);
});

test.describe('Тесты со статьёй', () => {
  //Создание статьи (нужна не во всех тикетах)
  test.beforeEach('Создание статьи', async ({ page }) => {
    const { title, description, body, tag } = newArticle;
    const homePage = new HomePage(page);
    const createArticle = new CreateArticlePage(page);
    const viewArticle = new ViewArticlePage(page);

    await homePage.gotoCreateArticle();
    await createArticle.createNewArticle(title, description, body, tag);
  });

  test('Пользователь может оставить коммент к статье', async ({ page }) => {
    const viewArticle = new ViewArticlePage(page);
    const comment = faker.string.alphanumeric({ length: { min: 50, max: 100 } });

    await viewArticle.createNewComment(comment);
    await expect(viewArticle.commentContent).toHaveText(comment);
  });

  test('Редактирование основного текста статьи', async ({ page }) => {
    const editArticle = new EditArticlePage(page);
    const viewArticle = new ViewArticlePage(page);
    const body = faker.string.alphanumeric({ length: { min: 50, max: 100 } });

    await viewArticle.goToeditArticle();
    await editArticle.updateArticleBody(body);
    await expect(viewArticle.articleContent).toHaveText(body);
  });
  /*Теперь тест выполняется */
  test('Удаление статьи', async ({ page }) => {
    const viewArticle = new ViewArticlePage(page);
    const body = faker.string.alphanumeric({ length: { min: 50, max: 100 } });

    await viewArticle.deleteArticle();
    // Ожидаем, что количество строк соответствующих созданной статье = 0
    await expect(viewArticle.articleContent).toHaveCount(0);
  });
});

// Тесты

test('Пользователь может сменить имя', async ({ page }) => {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  const newName = faker.person.fullName();

  await homePage.gotoSettings();
  await settingsPage.changeName(newName);
  await expect(homePage.profileName).toContainText(newName);
});

test('Пользователь может сменить пароль', async ({ page }) => {
  const homePage = new HomePage(page);
  const logInPage = new LogInPage(page);
  const mainPage = new MainPage(page);
  const settingsPage = new SettingsPage(page);
  const newPassword = faker.internet.password({ length: 10 });

  await homePage.gotoSettings();
  await settingsPage.changePassword(newPassword);
  await homePage.logOut();
  await mainPage.goToLogIn();
  await logInPage.logIn(user.email, newPassword);
  await expect(homePage.profileName).toContainText(user.name);
});
test('Пользователь может сменить почту', async ({ page }) => {
  const homePage = new HomePage(page);
  const logInPage = new LogInPage(page);
  const mainPage = new MainPage(page);
  const settingsPage = new SettingsPage(page);
  const newEmail = faker.internet.email({ provider: 'example.fakerjs.dev' });

  await homePage.gotoSettings();
  await settingsPage.changeEmail(newEmail);
  await homePage.logOut();
  await mainPage.goToLogIn();
  await logInPage.logIn(newEmail, user.password);
  await expect(homePage.profileName).toContainText(user.name);
});
