import { test } from '@playwright/test';
export class HomePage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.profileName = page.locator('.nav-link.dropdown-toggle.cursor-pointer');
    this.profName = page.locator('.dropdown-menu');
    this.profileLink = page
      .getByRole('link', { name: ' Profile' })
      .describe('Кнопка/ссылка на профиль');
    this.createArticleLink = page
      .getByRole('link', { name: ' New Article' })
      .describe('Кнопка/ссылка на создание статьи');
    this.settingsLink = page
      .getByRole('link', { name: 'Settings' })
      .describe('Кнопка/ссылка на настройки профиля');
    this.logOutLink = page
      .getByRole('link', { name: 'Logout' })
      .describe('Кнопка на выход из аккаунта');
  }
  //Бизнесовые действия со страницей

  //Перейти в настройки
  async gotoSettings() {
    return test.step('Переход в настройки пользователя', async (step) => {
      await this.profileName.click();
      await this.settingsLink.click();
    });
  }

  //Выйти из профиля
  async logOut() {
    return test.step('Выход из профиля', async (step) => {
      await this.profileName.click();
      await this.logOutLink.click();
    });
  }
  //Перейти в создание статьи
  async gotoCreateArticle() {
    return test.step('Перейти на страницу создания статьи', async (step) => {
      this.createArticleLink.click();
    });
  }
}
