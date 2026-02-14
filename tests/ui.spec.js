import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';
import { UserBuilder, ArticleBuilder } from '../src/helpers/builders/index';

// Переменные

//Адрес
//const url = 'https://realworld.qa.guru/';

//Тесты для заполнения тестовыми данными
//Регистрация (нужна всегда)

test('Пользователь может оставить коммент к статье', async ({ newArticle }) => {
  const { app } = newArticle;
  const comment = new ArticleBuilder().withComment().build();

  await app.viewArticle.createNewComment(comment.comment);

  await expect(app.viewArticle.commentContent).toHaveText(comment.comment);
});

test('Редактирование основного текста статьи', async ({ newArticle }) => {
  const { app } = newArticle;
  const newBody = new ArticleBuilder().withBody().build();

  await app.viewArticle.goToeditArticle();
  await app.editArticle.updateArticleBody(newBody.body);

  await expect(app.viewArticle.articleContent).toHaveText(newBody.body);
});
/*Теперь тест выполняется */
test('Удаление статьи', async ({ newArticle }) => {
  const { app } = newArticle;
  await app.viewArticle.deleteArticle();

  // Ожидаем, что количество строк соответствующих созданной статье = 0
  await expect(app.viewArticle.articleContent).toHaveCount(0);
});

test('Пользователь может сменить имя', async ({ profilePage }) => {
  const { app } = profilePage;
  const newname = new UserBuilder().withName().build();

  await app.home.gotoSettings();
  await app.settings.changeName(newname.name);

  await expect(app.home.profileName).toContainText(newname.name);
});

test('Пользователь может сменить пароль', async ({ profilePage }) => {
  const { app, user } = profilePage;
  const newpassword = new UserBuilder().withPassword().build();

  await app.home.gotoSettings();
  await app.settings.changePassword(newpassword.password);
  await app.home.logOut();
  await app.main.goToLogIn();
  await app.logIn.logIn(user.email, newpassword.password);

  await expect(app.home.profileName).toContainText(user.name);
});

test('Пользователь может сменить почту', async ({ profilePage }) => {
  const { app, user } = profilePage;
  const newemail = new UserBuilder().withEmail().build();

  await app.home.gotoSettings();
  await app.settings.changeEmail(newemail.email);
  await app.home.logOut();
  await app.main.goToLogIn();
  await app.logIn.logIn(newemail.email, user.password);

  await expect(app.home.profileName).toContainText(user.name);
});
