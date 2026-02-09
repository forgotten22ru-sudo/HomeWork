export class MainPage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.signuplink = page.getByRole('link', { name: 'Sign up' });
  }
  //Бизнесовые действия со страницей
  async gotoRegister() {
    this.signuplink.click();
  }

  async open(url) {
    await this.page.goto(url);
  }
}
