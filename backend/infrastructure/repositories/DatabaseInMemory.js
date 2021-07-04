const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')

class DatabaseInMemory {
    constructor({ port, dbName }) {
        this.mongoServer = new MongoMemoryServer({
            instance: {
                port: port,
                dbName: dbName,
            }
        })
        console.log(`Using mongo memory server on host: "mongodb://127.0.0.1:${port}/${dbName}"`)
        this.mongoClient = null
    }

    async getCollection(name)  {
        const db = await this._getDb()
        return db.collection(name)
    }

    async _getDb() {
        const client = await this._getClient()
        const dbName = await this.mongoServer.getDbName()
        return client.db(dbName)
    }

    async _getClient()  {
        const url = await this.mongoServer.getConnectionString()

        if (!this.mongoClient || (this.mongoClient && !this.mongoClient.isConnected())) {
            this.mongoClient = await MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        }
        return this.mongoClient
    }

    async dropDatabase() {
        const database = await this._getDb()
        await database.dropDatabase()
    }

    async close() {
        if (!this.mongoClient) return
        await this.mongoClient.close()
        await this.mongoServer.stop()
    }
}

module.exports = DatabaseInMemory
