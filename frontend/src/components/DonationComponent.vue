<template lang="pug">
  div.wrapper
    .d-flex.flex-column
      radio-button-group(
        :value.sync="selectedPreset"
        :options="options"
      )

      div.input-group.mb-5
        span.input-group-text {{ selectedCurrency.symbol }}
        b-input.form-control.amount-input(
          id="number_input"
          min="1"
          step="1"
          v-model="amount"
          type="number"
          @input="inputEvent"
          @keydown.native="onInputKeydown"
        )

        b-dropdown.currency-dropdown(variant="link")
          template.d-flex.row.align-items-center(v-slot:button-content)
            span.mx-1 {{ selectedCurrency.code }}
          b-dropdown-item(
            v-for="currency in currencies"
            :key="`currency_symbol_${currency.symbol}`"
            @click="selectedCurrency = currency"
          ) {{ currency.code }}

      b-button.btn.btn-primary.mx-3(
        variant="primary"
        @click="donate"
        :disabled="loading"
      )
        b-icon(v-if="loading" icon="arrow-clockwise" animation="spin")
        span(v-else) DONATE

      p.mt-3(v-if="successMessage || errorMessage") {{ successMessage || errorMessage }}
</template>

<script>
import api from '../../httpClient'
import RadioButtonGroup from './RadioButtonGroup'

export default {
  name: 'donation-component',
  components: {
    RadioButtonGroup,
  },
  data() {
    const currencies = [
        { name: 'US Dollar', code: 'USD', symbol: '$', rate: 1 },
        { name: 'Euro', code: 'EUR', symbol: '€', rate: 0.897597 },
        { name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.81755 },
        { name: 'Russian Ruble', code: 'RUB', symbol: '₽', rate: 63.461993 },
      ]
    const selectedCurrency = currencies[0]
    const defaultPreset = 40

    return {
      loading: false,

      presets: [40, 100, 200, 1000, 2500, 5000],
      selectedPreset: defaultPreset,
      amount: defaultPreset,

      currencies,
      selectedCurrency,
      errorMessage: null,
      successMessage: null,

      unavailableSymbols: [',', '.', 'e', '+', '-']
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
      this.amount = Number(newVal)
    },

    selectedCurrency() {
      const amount = this.convertToRate(this.amount)

      if (!this.selectedPreset) {
        this.amount = Math.floor(amount)
      } else {
        this.amount = this.roundUpAmount(amount)
        this.selectedPreset = this.amount
      }
    },
  },
  methods: {
    inputEvent(value) {
      if (!value) this.amount = 0

      const number = parseInt(value)
      this.selectedPreset = this.options.some(p => number === p.value)
        ? number : null
    },

    onInputKeydown(event) {
      if (this.unavailableSymbols.includes(event.key)) {
        event.preventDefault()
      }
    },

    convertToRate(amount) {
      return this.selectedCurrency.rate * parseInt(amount)
    },

    roundUpAmount(amount) {
      const bitness = Math.pow(10, Math.ceil(amount).toString().length - 1)
      const rest = Math.floor(amount % bitness)
      const roundTo = rest >= bitness / 2 ? amount + bitness - rest : amount - rest
      return Math.floor(roundTo)
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

.input-group {
  width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.input-group-text {
  background-color: white;
  border-top: 1px;
  border-bottom: 1px;
  border-left: 1px;
}

.amount-input {
  border-top: 1px;
  border-bottom: 1px;
  border-right: unset;
  border-left: unset;
}
</style>

<style>
.currency-dropdown button  {
  background-color: white;
  border-top: 1px;
  border-right: 1px;
  border-bottom: 1px;
}

input[type=number] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
