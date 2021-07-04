- Клоним репу - `git clone https://github.com/blognat/test.git`
- Заходим в папку: `cd test`

### Запуск frontend

```
cd frontend
yarn install
yarn serve
```

Фронт стучится на бэк на порт 3000.

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

Бэк поднимается на порту 3000. Он должен быть свободен. На него стучится фронт.
