import { test } from '@playwright/test';
export class MainPage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.signuplink = page
      .getByRole('link', { name: 'Sign up' })
      .describe('Кнопка/ссылка на регистрацию');
    this.logInLink = page.getByRole('link', { name: 'Login' }).describe('кнопка войти');
  }
  //Бизнесовые действия со страницей
  async gotoRegister() {
    return test.step('Перейти на страницу регистрации', async (step) => {
      await this.signuplink.click();
    });
  }

  async open(url) {
    return test.step(`Открыть главную страницу ${url} `, async (step) => {
      await this.page.goto(url);
    });
  }

  async goToLogIn() {
    return test.step('Перейти на страницу входа в профиль', async (step) => {
      await this.logInLink.click();
    });
  }
}
