# NEVA LAB Frontend

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение поднимется на `http://localhost:5173`.

## Сборка

```bash
npm run build
npm run preview
```

## Данные

Проекты, направления и обработчик заявок находятся в:

- `src/data/projects.js`
- `src/data/directions.js`
- `src/data/applications.js`

## Telegram

Для отправки заявок в Telegram задайте переменные окружения:

- `VITE_TELEGRAM_BOT_TOKEN`
- `VITE_TELEGRAM_CHAT_ID`

Если переменные пустые, заявка сохранится только локально (`localStorage`).
