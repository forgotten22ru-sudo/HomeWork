import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';
import { Api } from '../../services/api.services';
import { UserBuilder, ArticleBuilder } from '../builders/index';

export const test = base.extend({
  //Создаем page
  app: async ({ page }, use) => {
    const app = new App(page);

    await use(app);
  },

  //Создаем пользователя
  registeredUser: async ({ page }, use) => {
    const user = new UserBuilder().withEmail().withName().withPassword().build();

    await use({ page, user });
  },

  //Регистрируем пользователя
  profilePage: async ({ app, registeredUser }, use) => {
    const { user } = registeredUser;

    await app.main.open('/');
    await app.main.gotoRegister();
    await app.registration.register(user.name, user.password, user.email);

    await use({ app, user });
  },

  // Создаем статью с новым зареганным пользователем
  newArticle: async ({ profilePage }, use) => {
    const article = new ArticleBuilder().withTitle().withDescription().withBody().withTag().build();
    const { app } = profilePage;
    await app.home.gotoCreateArticle();
    await app.createArticle.createNewArticle(
      article.title,
      article.description,
      article.body,
      article.tag,
    );

    await use({ app, article });
  },

  apiURL: async ({}, use, testInfo) => {
    //Создал фикстуру для apiURL
    await use(testInfo.project.use.apiURL);
  },

  //Создаем api
  api: async ({ request, apiURL }, use) => {
    const api = new Api(request, apiURL);
    await use(api);
  },

  //Получаем токен
  getToken: async ({ api }, use) => {
    const token = await api.challenger.post();
    await use({ api, token });
  },
});
