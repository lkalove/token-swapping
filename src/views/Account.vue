<template>
  <div class='account'>
    <div>
      <p>{{ accountInfo.address }}</p>
    </div>
  </div>
</template>
<style lang='scss'>
@import '@/assets/styles/account.scss';
</style>
<script lang='ts'>
import isEmpty from 'is-empty';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Account',
  components: {},
  created(this: any) {
    if (isEmpty(this.$store.getters['accountStore/accountInfo'].address)) {
      this.$store.dispatch('accountStore/fetchAccountInfo');
    }
  },
  computed: {
    accountInfo(this: any) {
      return this.$store.getters['accountStore/accountInfo'];
    },
  },
});
</script>