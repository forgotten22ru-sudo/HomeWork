import { test, expect } from '@playwright/test';

test('Аноним может создать задачу', async ({ page }) => {
  // Предусловие
  await page.goto('https://todomvc.com/examples/vue/dist/#/');

  // Шаги
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('тестовое название');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  //Проверки
  await expect(page.getByText('тестовое название')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('тестовое название');

  // TODO Проверить проверку счетчика
});
