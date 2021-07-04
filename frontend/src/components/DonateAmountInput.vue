<template lang="pug">
  div.input-group.mb-5
    span.input-group-text {{ symbol }}
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
        span.mx-1 {{ code }}
      b-dropdown-item(
        v-for="currency in currencies"
        :key="`currency_symbol_${currency.symbol}`"
        @click="setCurrency(currency)"
      ) {{ currency.code }}
</template>

<script>
export default {
  name: 'donate-amount-input-group',
  props: {
    currencies: {
      type: Array,
      default: () => [],
    },
    donateAmount: {
      type: Number,
      default: 0,
    },
    symbol: {
      type: String,
      default: '$',
    },
    code: {
      type: String,
      default: 'USD',
    },
    selectedCurrency: {
      type: Object,
      default: () => {},
    },
  },
  data() {


    return {
      unavailableSymbols: [',', '.', 'e', '+', '-'],
    }
  },
  computed: {
    amount: {
      get() {
        return this.donateAmount
      },
      set(val) {
        if (!parseInt(val)) {
          this.inputEvent(val)
        }
      },
    },
    currency: {
      get() {
        return this.selectedCurrency
      },
      set(val) {
        this.$emit('update:selectedCurrency', val)
      }
    },
  },
  methods: {
    inputEvent(value) {
      this.$emit('update:donateAmount', parseInt(value))
    },

    onInputKeydown(event) {
      if (this.unavailableSymbols.includes(event.key)) {
        event.preventDefault()
      }
    },

    setCurrency(val) {
      this.currency = val
    }
  }
}
</script>

<style scoped>
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
