class DonationsRepository {
    constructor(database) {
        this.database = database
    }

    async save(donate) {
        this.collection = await this._getCollection()

        const response = await this.collection.save(donate)

        if (response.result.ok !== 1) {
            throw new Error('DonationRepository save failed')
        }
    }

    async _getCollection() {
        return this.database.getCollection('donations')
    }
}

module.exports = DonationsRepository
