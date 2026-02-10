export class SettingsPage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.updateProfileButton = page
      .getByRole('button', { name: 'Update Settings' })
      .describe('Кнопка обновления данных');
    this.pictureUrlInput = page
      .getByRole('textbox', { name: 'URL of profile picture' })
      .describe('Поле для ссылки на фото');
    this.nameInput = page.getByRole('textbox', { name: 'Your Name' }).describe('Поле Имя');
    this.bioInput = page
      .getByRole('textbox', { name: 'Short bio about you' })
      .describe('Поле краткой биографии');
    this.emailInput = page.getByRole('textbox', { name: 'Email' }).describe('Поле почты');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' }).describe('Поле пароля');
  }
  //Бизнесовые действия со страницей
  // Сменить имя пользователя
  async changeName(name) {
    await this.nameInput.click();
    await this.nameInput.fill(name);

    this.updateProfileButton.click();
  }

  //Сменить био пользователя
  async changeBio(bio) {
    await this.bioInput.click();
    await this.bioInput.fill(bio);

    this.updateProfileButton.click();
  }

  //Сменить почту
  async changeEmail(email) {
    await this.emailInput.click();
    await this.emailInput.fill(email);

    this.updateProfileButton.click();
  }

  //Сменить пароль
  async changeEmail(password) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    this.updateProfileButton.click();
  }
}
