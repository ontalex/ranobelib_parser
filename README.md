# Fastify + TypeScript + MongoDB Starter

## Установка

```bash
npm i
```

## Переменные окружения

Скопируйте файл env.example в .env и измените значения при необходимости.

Пример:

```bash
cp env.example .env
```

-   PORT — порт HTTP сервера (по умолчанию 3000)
-   HOST — хост бинда (по умолчанию 0.0.0.0)
-   MONGODB_URI — строка подключения к MongoDB
-   API_KEY — ключ для доступа к защищённым маршрутам

## Скрипты

```bash
npm run dev
npm run build
npm start
```

## Маршруты

-   GET /health — базовая проверка
-   GET /health/db — проверка доступности MongoDB
-   GET /secure — защищённый маршрут, требуется заголовок x-api-key
