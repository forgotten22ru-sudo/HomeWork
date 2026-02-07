import { test, expect } from '@playwright/test';

test('Пользователь может заказать бургер', async ({ page }) => {
  //Предусловие:
  await page.goto('file://C:/Users/tsybovsky.nv/Downloads/Telegram%20Desktop/burger-order.html');
  //Шаги
  // вариант 1 поиск по роли
  // await page.getByRole('textbox', { name: 'Имя клиента' }).click();
  // вариант 2 поиск по плейсхолдеру
  await page.getByPlaceholder('Введите ваше имя').click();
  // Поиск по тегу (ключ-значение)
  await page.locator('[placeholder = "Введите ваше имя"]').fill('test');
  // Поиск по CSS id
  await page.locator('#burgerType').selectOption('cheeseburger');
  // Поиск по тексту
  await page.getByText('Горчица').click();
  // Поиск по label
  //await page.getByLabel('Горчица').click();
  // Поиск по классу
  await page.locator('.radio-group', { hasText: 'Большой' }).click();
  //Для класса заказ с собой
  await page.locator('.switch-slider').click();
  //Поиск по тексту
  await page.getByText('+').click();
  //Способ оплаты
  await page.getByText('Картой онлайн').click();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  //Ожидаемый результат:
  await expect(page.getByText('✅ Заказ принят!')).toBeVisible();
  await expect(page.locator('#popupMessage')).toContainText('Спасибо за заказ, test!');
  /* await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('Nick1123');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('Nick1123@ya.ru');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText('Nick1123');*/
});
