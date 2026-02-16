# Скрипты для Allure Report

## Совместимость с allure-notifications (формат Allure 2)

Allure Report 3 кладёт сводку в `allure-report/summary.json`. Утилита **allure-notifications** ожидает файл в формате Allure 2 по пути `allure-report/widgets/summary.json` (с объектами `statistic` и `time`).

### Что сделать один раз

1. Создайте папку `scripts` в корне проекта (если её ещё нет).
2. Положите в неё файл `allure2-widgets-summary.js` — он преобразует корневой `summary.json` в формат Allure 2 и записывает результат в `allure-report/widgets/summary.json`.

### После каждой генерации отчёта Allure 3

Сразу после генерации отчёта (например, `allure generate` или `npm run reportallure`) вызовите скрипт:

```bash
node scripts/allure2-widgets-summary.js
```

Тогда allure-notifications сможет прочитать `allure-report/widgets/summary.json` и отправить уведомления (Telegram, Slack и т.д.).

### Пример полного цикла

```bash
# 1. Запуск тестов (allure-results создаётся репортером)
npx playwright test

# 2. Генерация отчёта Allure 3
npm run report

# 3. Подготовка файла для allure-notifications
node scripts/allure2-widgets-summary.js

# 4. Отправка уведомлений
java "-DconfigFile=notifications/config.json" -jar notifications/allure-notifications-4.11.0.jar
```

В `package.json` шаги 2 и 3 уже объединены в одной команде `reportallure`, поэтому достаточно:

```bash
npx playwright test
npm run report
java "-DconfigFile=notifications/config.json" -jar notifications/allure-notifications-4.11.0.jar
```

### В CI

После шага генерации отчёта добавьте вызов скрипта (если не используете `npm run reportallure`, который уже его вызывает):

```yaml
- run: npm run report
- run: node scripts/allure2-widgets-summary.js # не нужен, если в report он уже есть
- run: java "-DconfigFile=notifications/config.json" -jar notifications/allure-notifications-4.11.0.jar
```

Или одной командой `npm run reportallure` (скрипт уже встроен в неё).
