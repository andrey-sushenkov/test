const { MongoClient } = require('mongodb')

class MongoDatabase {
    constructor(options) {
        this.options = options

        this.mongoClient = new MongoClient(options.mongoApiEndpoint, {
            useNewUrlParser: true,
        })
    }

    async getCollection(name)  {
        const db = await this.getDb()
        return db.collection(name)
    }

    async getDb() {
        const client = await this.getClient()
        return client.db(this.options.mongoDatabase)
    }

    async getClient() {
        if (!await this.mongoClient.isConnected()) {
            await this.mongoClient.connect()
        }
        return this.mongoClient
    }
}

module.exports = MongoDatabase
