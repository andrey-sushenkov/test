### Запуск frontend

```
cd frontend
yarn install
yarn serve
```

### Запуск backend

Надо иметь предустановленный [nodemon](https://www.npmjs.com/package/nodemon)

Создать `.env` file с содержимым 
```
NODE_ENV=test (дефолтное состояние, запускает mongodb in memory. Консолит адрес коннекта)
или
NODE_ENV=production
MONGO_URI= (по дефолту - 'mongodb://127.0.0.1:8004')
MONGO_DATABASE= (по дефолту - 'test-database') 
```
```
cd backend
yarn install
yarn start
```
