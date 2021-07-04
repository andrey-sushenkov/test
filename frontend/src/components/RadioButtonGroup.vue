<template lang="pug">
  b-form-group.mb-5
    b-form-radio-group.radio-button-group(
      id="btn-radios-1"
      v-model="checkedItem"
      :options="options"
      name="radios-btn-default"
      buttons
      button-variant="outline-primary"
    )
</template>

<script>
export default {
  name: 'radio-button-group',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    checkedItem: {
      get() {
        return this.value
      },
      set(val) {
        this.inputRadioEvent(val)
      },
    }
  },
  methods: {
    inputRadioEvent(value) {
      if (value) this.$emit('update:value', value)
    },
  }
}
</script>

<style>
[type='radio'] {
  display: none;
}
</style>
