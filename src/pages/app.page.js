import {
  MainPage,
  RegistrationPage,
  HomePage,
  CreateArticlePage,
  ViewArticlePage,
  EditArticlePage,
  SettingsPage,
  LogInPage,
} from './index';

export class App {
  constructor(page) {
    this.page = page;
    this.createArticle = new CreateArticlePage(page);
    this.editArticle = new EditArticlePage(page);
    this.home = new HomePage(page);
    this.logIn = new LogInPage(page);
    this.main = new MainPage(page);
    this.registration = new RegistrationPage(page);
    this.settings = new SettingsPage(page);
    this.viewArticle = new ViewArticlePage(page);
  }
}
