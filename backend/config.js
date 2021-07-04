const isProduction = process.env.NODE_ENV === 'production'

exports.config = {
  isProduction,
  availableCurrencies: ['USD', 'EUR', 'GBP', 'RUB'],
  db: isProduction
      ? { mongoApiEndpoint: 'mongodb://127.0.0.1:8004', mongoDatabase: 'test-database' }
      : { port: 64084, dbName: 'test-database' }
}
