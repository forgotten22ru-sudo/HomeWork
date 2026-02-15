import { test } from '@playwright/test';
export class RegistrationPage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.signupButton = page
      .getByRole('button', { name: 'Sign up' })
      .describe('Кнопка регистрации');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' }).describe('Поле пароль');
    this.emailInput = page.getByRole('textbox', { name: 'Email' }).describe('Поле почты');
    this.nameInput = page.getByRole('textbox', { name: 'Your Name' }).describe('Поле имя');
    this.signuplink = page
      .getByRole('link', { name: 'Sign up' })
      .describe('Кнопка/ссылка на регистрацию');
  }
  //Бизнесовые действия со страницей
  async register(name, password, email) {
    return test.step('Записываем данные для регистрации нового пользователя', async (step) => {
      await this.passwordInput.click();
      await this.passwordInput.fill(password);

      await this.emailInput.click();
      await this.emailInput.fill(email);

      await this.nameInput.click();
      await this.nameInput.fill(name);

      await this.signupButton.click();
    });
  }
}
