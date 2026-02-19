import { faker } from '@faker-js/faker';

export class UserBuilder {
  withEmail(email) {
    this.email = email ?? faker.internet.email({ provider: 'example.fakerjs.dev' }); // Генерим почту
    return this;
  }
  withName(name) {
    this.name = name ?? faker.person.fullName(); // Генерация Имени
    return this;
  }
  withPassword(length = 7) {
    this.password = faker.internet.password({ length: length }); // Генерим пароль
    return this;
  }
  build() {
    const result = { ...this };
    return result;
  }
}
