# NEVA LAB Front + Admin + Server

## Быстрый старт (локально)

1. Установите зависимости в каждом приложении:

```bash
npm install
npm --prefix server install
npm --prefix admin install
```

2. Поднимите PostgreSQL:

```bash
docker compose -f server/docker-compose.yml up -d
```

3. Настройте `server/.env` по шаблону `server/.env.example`:
- сгенерируйте `JWT_SECRET`:
  `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- задайте `DATABASE_URL`
- при первом запуске можно передать `ADMIN_INITIAL_PASSWORD` (временно)

4. Запустите все сервисы одной командой:

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

Команда собирает `frontend` и `admin`.

## Прод-стек через Docker Compose

1. Создайте `.env` из `.env.example` в корне.
2. Запустите:

```bash
docker compose up --build -d
```

Сервисы:
- frontend: `http://localhost`
- admin: `http://localhost:8080`
- server API: `http://localhost:3001/api`

## Безопасность

- `JWT_SECRET` обязателен и должен быть длинным/случайным.
- `ADMIN_PASSWORD` не хранится в `.env`.
- Если админ отсутствует в БД, сервер создаст пользователя `ADMIN_USERNAME` и сохранит только хеш пароля.
- `server/.env` исключен из Git.
