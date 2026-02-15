import { test } from '@playwright/test';
export class CreateArticlePage {
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
    this.articlePublishButton = page
      .getByRole('button', { name: 'Publish Article' })
      .describe('Кнопка публикации');
  }
  //Бизнесовые действия со страницей

  // Создание статьи
  async createNewArticle(title, description, body, tag) {
    return test.step('Создание новой статьи', async (step) => {
      await this.articleTitleInput.click();
      await this.articleTitleInput.fill(title);

      await this.articleDescriptionInput.click();
      await this.articleDescriptionInput.fill(description);

      await this.articleBodyInput.click();
      await this.articleBodyInput.fill(body);

      await this.articleTagInput.click();
      await this.articleTagInput.fill(tag);

      await this.articlePublishButton.click();
    });
  }
}
