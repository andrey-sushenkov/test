class DonateHandler {
    constructor({ donationsRepository, availableCurrencies }) {
        this.donationsRepository = donationsRepository
        this.availableCurrencies = availableCurrencies
    }

    async handle({ amount, currency }) {
        this._checkParams({ amount, currency })

        await this.donationsRepository.save({ amount, currency })

        return true
    }

    _checkParams({ currency, amount }) {
        this._checkAmount(amount)
        this._checkCurrency(currency)
    }

    _checkAmount(amount) {
        if (amount == null ) {
            throw new Error('"amount" field should be provided')
        }
        if (Number.isNaN(amount)) {
            throw new Error('Amount value is not valid. Please, provide a valid amount')
        }
        this._isValueGreaterThanZero(amount)
    }

    _isValueGreaterThanZero(value) {
        if (value < 0) {
            throw new Error('Amount should be greater than zero')
        }
    }

    _checkCurrency(currency) {
        if (currency == null ) {
            throw new Error('"currency" field should be provided')
        }

        if (!this.availableCurrencies.some(c => c === currency)) {
            throw new Error(`"currency" field should be one of the following values [${this.availableCurrencies}]`)
        }
    }
}

module.exports = DonateHandler
