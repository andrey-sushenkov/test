<template lang="pug">
  div.home
    donation-component

</template>

<script>
import DonationComponent from '../components/DonationComponent'

export default {
  name: 'Home',
  components: {
    DonationComponent,
  },
};
</script>

<style scoped>
.home {

}
</style>
