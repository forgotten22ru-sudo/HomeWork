import { faker } from '@faker-js/faker';

export class TodoBuilder {
  withId(id) {
    this.id = id ?? faker.number.int({ min: 12, max: 100 }); // Генерирую ID
    return this;
  }
  withTitle(title) {
    this.title = title ?? faker.word.words({ count: { min: 3, max: 5 } }); // Генерирую заголовок
    return this;
  }
  withDone(done = true) {
    this.doneStatus = done; //создаю статус, который по умолчанию будет true
    return this;
  }
  withDescription(description) {
    this.description = description ?? faker.word.words({ count: { min: 5, max: 10 } }); // Генерирую описание
    return this;
  }
  build() {
    const result = { ...this };
    return result;
  }
}
