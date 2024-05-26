# Используем официальный образ Node.js с LTS версией
FROM node:14 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в образ
# COPY . .
COPY ./public/index.html /app/public/

# Собираем приложение
RUN npm run build

# Второй этап: создаем легковесный образ для запуска приложения
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа в Nginx
COPY --from=build /app/build /usr/share/nginx/html


# Указываем порт, который будет использоваться Nginx в контейнере
EXPOSE 80

# Команда для запуска Nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]
