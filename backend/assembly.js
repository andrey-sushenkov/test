require('dotenv').config()

const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

const { createRouter } = require('./infrastructure/router')
const DatabaseInMemory = require('./infrastructure/repositories/DatabaseInMemory')
const Database = require('./infrastructure/repositories/Database')
const DonationsRepository = require('./infrastructure/repositories/DonationsRepository')
const DonateHandler = require('./core/donate/DonateHandler')

const { config } = require('./config.js')

const database = config.isProduction ? new Database(config.db) : new DatabaseInMemory(config.db)

const donationsRepository = new DonationsRepository(database)
const donateHandler = new DonateHandler({
    donationsRepository,
    availableCurrencies: config.availableCurrencies,
})
const router = createRouter({ donateHandler })

const app = new Koa()
app.use(koaBody())
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port = 3000, () => {
    console.log(`Server started on port ${port}`)
})
