import { faker } from '@faker-js/faker';

export class ArticleBuilder {
  withTitle(title) {
    this.title =
      title ?? faker.string.alpha({ length: { min: 5, max: 15 } }); /* Генерирую заголовок
  на английском 5-15 символов*/
    return this;
  }
  withDescription(description) {
    this.description = description ?? faker.string.alpha({ length: { min: 15, max: 50 } }); // Генерю описание
    return this;
  }
  withBody(body) {
    this.body = body ?? faker.string.alphanumeric({ length: { min: 50, max: 150 } }); // Генерю текст статьи
    return this;
  }
  withTag(tag) {
    this.tag = tag ?? faker.string.alpha({ length: { min: 3, max: 8 } }); // Генерим тэги
    return this;
  }
  withComment(comment) {
    this.comment = comment ?? faker.string.alphanumeric({ length: { min: 50, max: 100 } }); // Генерим Комментарий
    return this;
  }
  build() {
    const result = { ...this };
    return result;
  }
}
