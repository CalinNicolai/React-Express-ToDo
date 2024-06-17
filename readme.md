# Проект ToDo с использованием React, TypeScript, Express.js и MongoDB

Этот проект представляет собой простое приложение для управления задачами (ToDo) с использованием технологий React, TypeScript, Express.js и MongoDB. Пользователи могут создавать новые задачи, отмечать их как выполненные и удалять.

## Установка

1. Клонируйте репозиторий: `git clone https://github.com/CalinNicolai/React-Express-ToDo.git`
2. Установите зависимости для клиентской части: `cd frontend && npm install`
3. Установите зависимости для серверной части: `cd ../server && npm install`

## Настройка базы данных MongoDB

1. Установите MongoDB на вашем компьютере или используйте облачное решение.
2. Создайте базу данных и коллекцию для приложения ToDo.

## Конфигурация

1. В папке `server` создайте файл `.env` и добавьте следующие переменные среды:
    Заполните пустые строки 
   ```dotenv
    PORT=5000
    DB_URL=
    JWT_ACCESS_SECRET=
    JWT_REFRESH_SECRET=
    SMTP_HOST=
    SMTP_PORT=
    SMTP_USER=
    SMTP_PASSWORD=
    API_URL=http://localhost:5000
    CLIENT_URL=http://localhost:3000
   ```
Запуск
------

1.  Запустите серверную часть: `cd frontend && npm run start`
2.  Запустите клиентскую часть: `cd ../client && npm run dev`
3.  Перейдите на `http://localhost:3000/` в браузере для использования приложения.

Структура проекта
-----------------

-   `frontend/` - Клиентская часть приложения на React и TypeScript.
-   `server/` - Серверная часть приложения на Express.js.
-   `readme.md` - Этот файл с описанием проекта и инструкциями.