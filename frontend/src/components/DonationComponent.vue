<template lang="pug">
  div.wrapper
    .d-flex.flex-column
      radio-button-group(:value.sync="selectedPreset" :options="options")

      donate-amount-input(
        :selectedCurrency.sync="selectedCurrency"
        :symbol="selectedCurrency.symbol"
        :code="selectedCurrency.code"
        :currencies="currencies"
        :donateAmount.sync="amount"
      )

      b-button.btn.btn-primary.mx-3(variant="primary" @click="donate" :disabled="loading")
        b-icon(v-if="loading" icon="arrow-clockwise" animation="spin")
        span(v-else) DONATE

      p.mt-3(v-if="successMessage || errorMessage") {{ successMessage || errorMessage }}
</template>

<script>
import api from '../../httpClient'
import RadioButtonGroup from './RadioButtonGroup'
import DonateAmountInput from './DonateAmountInput'

import { roundUpAmount } from '../helper'

export default {
  name: 'donation-component',
  components: {
    RadioButtonGroup,
    DonateAmountInput,
  },
  data() {
    const currencies = [
      { name: 'US Dollar', code: 'USD', symbol: '$', rate: 1 },
      { name: 'Euro', code: 'EUR', symbol: '€', rate: 0.897597 },
      { name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.81755 },
      { name: 'Russian Ruble', code: 'RUB', symbol: '₽', rate: 63.461993 },
    ]
    const defaultPreset = 40

    return {
      loading: false,

      presets: [40, 100, 200, 1000, 2500, 5000],
      selectedPreset: 40,
      amount: defaultPreset,

      currencies,
      selectedCurrency: currencies[0],
      errorMessage: null,
      successMessage: null,
      roundUpAmount,
    }
  },
  computed: {
    options() {
      return this.presets.map(preset => {
        const amount = this.roundUpAmount(this.convertToRate(Number(preset)))
        return {
          text: `${this.selectedCurrency.symbol}${amount.toLocaleString('en-US')}`,
          value: amount,
      }})
    },
  },
  watch: {
    amount(newVal) {
      if (Number.isNaN(newVal) || !newVal) {
        this.amount = 0
        this.selectedPreset = null
        return
      }
      this.amount = parseInt(newVal)
      this.selectedPreset = this.options.some(p => this.amount === p.value) ? this.amount : null
    },

    selectedPreset(newVal) {
      if (newVal) this.amount = newVal
    },

    selectedCurrency() {
      const amount = this.convertToRate(this.amount)

      if (!this.selectedPreset) {
        return this.amount = Math.floor(amount)
      }

      this.amount = this.roundUpAmount(amount)
      this.selectedPreset = this.amount
    },
  },
  methods: {
    convertToRate(amount) {
      return this.selectedCurrency.rate * parseInt(amount)
    },

    async donate() {
      this.successMessage = null
      this.errorMessage = null
      this.loading = true

      try {
        await api.donate({ currency: this.selectedCurrency.code, amount: this.amount })

        await new Promise((resolve) => setTimeout(resolve, 2000)) // just to imitate a loader

        this.successMessage = 'Thank you for your donation!'
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.loading = false
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  padding-bottom: 15px;
  padding-top: 15px;
  width: 520px;
  border-radius: 1rem;
  background-color: rgb(245, 245, 245);
  box-shadow: rgb(209, 209, 209);
  border-width: 3px;
  margin-left: auto;
  margin-right: auto;
}
</style>
