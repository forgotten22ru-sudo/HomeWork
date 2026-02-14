import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';
import { UserBuilder, ArticleBuilder } from '../src/helpers/builders/index';

// Переменные

//Адрес
const url = 'https://realworld.qa.guru/';

//Тесты для заполнения тестовыми данными
//Регистрация (нужна всегда)
test.beforeEach('Регистрация пользователя', async ({ page }) => {
  const user = new UserBuilder().withEmail().withName().withPassword().build();
  const app = new App(page);

  await app.main.open(url);
  await app.main.gotoRegister();
  await app.registration.register(user.name, user.password, user.email);
});

test.describe('Тесты со статьёй', () => {
  //Создание статьи (нужна не во всех тикетах)
  test.beforeEach('Создание статьи', async ({ page }) => {
    const article = new ArticleBuilder().withTitle().withDescription().withBody().withTag().build();
    const app = new App(page);

    await app.home.gotoCreateArticle({ timeout: 10_000 });
    await app.createArticle.createNewArticle(
      article.title,
      article.description,
      article.body,
      article.tag,
    );
  });

  test('Пользователь может оставить коммент к статье', async ({ page }) => {
    const comment = new ArticleBuilder().withComment().build();
    const app = new App(page);

    await app.viewArticle.createNewComment(comment.comment);

    await expect(app.viewArticle.commentContent).toHaveText(comment.comment);
  });

  test('Редактирование основного текста статьи', async ({ page }) => {
    const newBody = new ArticleBuilder().withBody().build();
    const app = new App(page);

    await app.viewArticle.goToeditArticle();
    await app.editArticle.updateArticleBody(newBody.body);

    await expect(app.viewArticle.articleContent).toHaveText(newBody.body);
  });
  /*Теперь тест выполняется */
  test('Удаление статьи', async ({ page }) => {
    const app = new App(page);

    await app.viewArticle.deleteArticle();

    // Ожидаем, что количество строк соответствующих созданной статье = 0
    await expect(app.viewArticle.articleContent).toHaveCount(0);
  });
});

// Тесты

test('Пользователь может сменить имя', async ({ page }) => {
  const newname = new UserBuilder().withName().build();
  const app = new App(page);

  await app.home.gotoSettings();
  await app.settings.changeName(newname.Name);

  await expect(app.home.profileName).toContainText(newname.name);
});

test('Пользователь может сменить пароль', async ({ page }) => {
  const newpassword = new UserBuilder().withPassword().build();
  const app = new App(page);

  await app.home.gotoSettings();
  await app.settings.changePassword(newpassword.password);
  await app.home.logOut();
  await app.main.goToLogIn();
  await app.logIn.logIn(user.email, newpassword.password);

  await expect(app.home.profileName).toContainText(user.name);
});
test('Пользователь может сменить почту', async ({ page }) => {
  const newEmail = faker.internet.email({ provider: 'example.fakerjs.dev' });
  const app = new App(page);

  await app.homePage.gotoSettings();
  await app.settingsPage.changeEmail(newEmail);
  await app.homePage.logOut();
  await app.mainPage.goToLogIn();
  await app.logInPage.logIn(newEmail, user.password);

  await expect(app.homePage.profileName).toContainText(user.name);
});
