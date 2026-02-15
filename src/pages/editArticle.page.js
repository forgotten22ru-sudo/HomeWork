import { test } from '@playwright/test';
export class EditArticlePage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.articleTitleInput = page
      .getByRole('textbox', { name: 'Article Title' })
      .describe('Заголовок статьи');
    this.articleDescriptionInput = page
      .getByRole('textbox', { name: "What's this article about?" })
      .describe('Описание статьи');
    this.articleBodyInput = page
      .getByRole('textbox', { name: 'Write your article (in' })
      .describe('Текст статьи');
    this.articleTagInput = page
      .getByRole('textbox', { name: 'Enter tags' })
      .describe('Тэги статьи');

    this.articleUpdateButton = page
      .getByRole('button', { name: 'Update Article' })
      .describe('Кнопка обновления');
  }
  //Бизнесовые действия со страницей

  // Редактирование статьи
  async updateArticleTitle(title) {
    return test.step('Редактирование статьи', async (step) => {
      await this.articleTitleInput.click();
      await this.articleTitleInput.fill(title);

      await this.articleUpdateButton.click();
    });
  }
  async updateArticleDescription(description) {
    return test.step('Редактирование описания статьи', async (step) => {
    await this.articleDescriptionInput.click();
    await this.articleDescriptionInput.fill(description);

    await this.articleUpdateButton.click();
    });
  }
  async updateArticleBody(body) {
    return test.step('Редактирование тела статьи', async (step) => {
    await this.articleBodyInput.click();
    await this.articleBodyInput.fill(body);

    await this.articleUpdateButton.click();
    });
  }
  async updateArticleTag(tag) {
    return test.step('Редактирование тэга статьи', async (step) => {
    await this.articleTagInput.click();
    await this.articleTagInput.fill(tag);

    await this.articleUpdateButton.click();
    });
  }
}
