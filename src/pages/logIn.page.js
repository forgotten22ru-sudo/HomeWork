import { test } from '@playwright/test';
export class LogInPage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.logInButton = page.getByRole('button', { name: 'Login' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' }).describe('Поле почты');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' }).describe('Поле пароль');
    this.wrongParametresMessage = page.locator('.error-messages li');
  }

  async logIn(email, password) {
    return test.step('Вход под существующим пользователем', async (step) => {
      await this.emailInput.click();
      await this.emailInput.fill(email);

      await this.passwordInput.click();
      await this.passwordInput.fill(password);

      await this.logInButton.click();
    });
  }
}
