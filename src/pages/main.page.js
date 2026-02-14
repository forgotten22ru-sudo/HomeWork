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
    await this.signuplink.click();
  }

  async open(url) {
    await this.page.goto(url);
  }

  async goToLogIn() {
    await this.logInLink.click();
  }
}
