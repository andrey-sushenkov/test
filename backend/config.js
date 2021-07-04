const isProduction = process.env.NODE_ENV === 'production'

exports.config = {
  isProduction,
  availableCurrencies: ['USD', 'EUR', 'GBP', 'RUB'],
  db: isProduction
      ? {
        mongoApiEndpoint: process.env.MONGO_URI || 'mongodb://127.0.0.1:8004',
          mongoDatabase: process.env.MONGO_DATABASE || 'test-database',
        } : { port: 64084, dbName: 'test-database' }
}
