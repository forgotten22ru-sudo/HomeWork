export class ViewArticlePage {
  // техническое описание страницы
  constructor(page) {
    this.page = page;
    this.deleteArticleButton = page
      .getByRole('button', { name: ' Delete Article' })
      .nth(1)
      .describe('Кнопка удаления статьи');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .nth(1)
      .describe('Кнопка редактирования статьи');
    this.commentInput = page
      .getByRole('textbox', { name: 'Write a comment...' })
      .describe('Поле комментария');
    this.commentButton = page
      .getByRole('button', { name: 'Post Comment' })
      .describe('Кнопка оставить комментарий');

    this.deleteCommentButton = page
      .getByRole('button', { name: '', exact: true })
      .describe('Кнопка удаления комментария');

    this.commentContent = page.locator('.card-text').describe('Текст комментария');
    this.articleContent = page.locator('.col-md-12 p').describe('Заполнение статьи');
  }
  //Бизнесовые действия со страницей

  //Создание коммента
  async createNewComment(commText) {
    await this.commentInput.click();
    await this.commentInput.fill(commText);

    await this.commentButton.click();
  }

  //Удаление Статьи
  async deleteArticle() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.deleteArticleButton.click();
  }

  //Переход в редактирование статьи
  async goToeditArticle() {
    await this.editArticleButton.click();
  }
}
