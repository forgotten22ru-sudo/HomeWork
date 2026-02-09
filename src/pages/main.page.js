export class MainPage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.signuplink = page
      .getByRole('link', { name: 'Sign up' })
      .describe('Кнопка/ссылка на регистрацию');
  }
  //Бизнесовые действия со страницей
  async gotoRegister() {
    this.signuplink.click();
  }

  async open(url) {
    await this.page.goto(url);
  }
}
