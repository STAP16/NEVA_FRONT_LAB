Сделал все пункты по вашему списку.

**Что изменено**

1. Единый запуск/сборка

- `npm run dev` запускает сразу frontend + server + admin через `concurrently`.
- `npm run build` теперь собирает и frontend, и admin.
- Файлы:
  - [package.json](c:/IT/MyProjects/NEVA_LAB_FRONT/package.json)

2. Секреты и админ

- Убран fallback и слабые значения для JWT: сервер теперь падает, если `JWT_SECRET`
  отсутствует/короткий.
- Убран `ADMIN_PASSWORD` из конфигурации.
- Добавлен first-run bootstrap админа:
  - если админа нет в БД, пароль хешируется и сохраняется в БД;
  - можно передать `ADMIN_INITIAL_PASSWORD` (временно), либо сервер сгенерирует одноразовый пароль и
    выведет его в лог.
- Убран hardcode `admin123` из seed.
- Добавлен генератор JWT:
  - `npm --prefix server run secret:jwt`
- Файлы:
  - [server/src/config.js](c:/IT/MyProjects/NEVA_LAB_FRONT/server/src/config.js)
  - [server/src/bootstrapAdmin.js](c:/IT/MyProjects/NEVA_LAB_FRONT/server/src/bootstrapAdmin.js)
  - [server/src/index.js](c:/IT/MyProjects/NEVA_LAB_FRONT/server/src/index.js)
  - [server/prisma/seed.js](c:/IT/MyProjects/NEVA_LAB_FRONT/server/prisma/seed.js)
  - [server/package.json](c:/IT/MyProjects/NEVA_LAB_FRONT/server/package.json)
  - [server/scripts/generate-jwt-secret.js](c:/IT/MyProjects/NEVA_LAB_FRONT/server/scripts/generate-jwt-secret.js)

3. `.env`/шаблоны/gitignore

- Обновлен шаблон без реальных секретов.
- Добавлен корневой `.env.example` для docker-compose.
- `.env` добавлены в игнор.
- `server/.env` удален из git-индекса (файл локально сохранен).
- Файлы:
  - [server/.env.example](c:/IT/MyProjects/NEVA_LAB_FRONT/server/.env.example)
  - [.env.example](c:/IT/MyProjects/NEVA_LAB_FRONT/.env.example)
  - [.gitignore](c:/IT/MyProjects/NEVA_LAB_FRONT/.gitignore)

4. Прод-стек (дополнительно)

- Добавлен общий `docker-compose.yml` для `postgres + server + frontend + admin`.
- Добавлены Dockerfile’ы и nginx-конфиги для frontend/admin.
- Добавлен `.dockerignore`.
- Файлы:
  - [docker-compose.yml](c:/IT/MyProjects/NEVA_LAB_FRONT/docker-compose.yml)
  - [server/Dockerfile](c:/IT/MyProjects/NEVA_LAB_FRONT/server/Dockerfile)
  - [docker/frontend.Dockerfile](c:/IT/MyProjects/NEVA_LAB_FRONT/docker/frontend.Dockerfile)
  - [docker/admin.Dockerfile](c:/IT/MyProjects/NEVA_LAB_FRONT/docker/admin.Dockerfile)
  - [docker/nginx-frontend.conf](c:/IT/MyProjects/NEVA_LAB_FRONT/docker/nginx-frontend.conf)
  - [docker/nginx-admin.conf](c:/IT/MyProjects/NEVA_LAB_FRONT/docker/nginx-admin.conf)
  - [.dockerignore](c:/IT/MyProjects/NEVA_LAB_FRONT/.dockerignore)

5. Документация

- Обновил README под новый workflow.
- Файл:
  - [README.md](c:/IT/MyProjects/NEVA_LAB_FRONT/README.md)

**Проверка**

- `npm run build` прошел успешно: собраны frontend и admin.
- `npm --prefix server run secret:jwt` работает.
- `node --check server/src/index.js` без синтаксических ошибок.
- Docker compose не запускал (только подготовил конфиги).

**Важно**

- В локальном `server/.env` уже поставлен новый криптостойкий `JWT_SECRET`, `ADMIN_PASSWORD` удален.
- В `git status` сейчас есть staged-удаление `server/.env` из репозитория (это правильно для
  секрета).
