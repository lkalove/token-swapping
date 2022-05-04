<template>
  <div class='swap'>
    <div class='swap-wrapper'>
      <div class='subtitle'>Swap</div>
      <div class='swap-input-wrapper'><input type='number' v-model='swapInfo.fromAmount' @input='setFrom' />
        <button v-on:click="openPopup('from')">{{ swapInfo.fromToken || 'Select' }}
          {{ swapInfo.fromToken && `(${swapInfo.balance})` }}
        </button>
      </div>
      <div class='switch-from-to' v-on:click='switchFromTo' />
      <div class='swap-input-wrapper'><input :disabled='true' v-model='swapInfo.toAmount' />
        <button v-on:click="openPopup('to')">{{ swapInfo.toToken || 'Select' }}</button>
      </div>
      <div class='price-info' v-if='swapInfo.price > 0'>1 {{ swapInfo.fromToken }} = {{ swapInfo.price }}
        {{ swapInfo.toToken }}
      </div>
    </div>
    <button class='swap-btn' :disabled='isSwapBtnDisabled()' v-on:click='swap()'>Swap</button>

  </div>
</template>

<style lang='scss'>
@import '@/assets/styles/swap.scss';
</style>

<script lang='ts'>
import { defineComponent } from 'vue';
import empty from 'is-empty';
import isEmpty from 'is-empty';

export default defineComponent({
  name: 'Swap',
  created(this: any) {
    this.$store.dispatch('tokenStore/fetchTokens');
    this.$store.dispatch('tokenStore/fetchBalances');
    this.$store.dispatch('tokenStore/fetchTokenPool');
  },
  computed: {
    swapInfo(this: any) {
      const swapInfo = this.$store.getters['tokenStore/swapInfo'];
      let { toToken, fromToken, fromAmount } = swapInfo;
      if (empty(toToken)) toToken = null;
      if (empty(fromToken)) fromToken = null;
      if (fromAmount === 0) fromAmount = '';
      return { ...swapInfo, toToken, fromToken, fromAmount };
    },
  },
  methods: {
    openPopup(this: any, type: string) {
      this.$store.dispatch('popupStore/openPopup', type);
    },
    setFrom(this: any, e: any) {
      this.$store.dispatch('tokenStore/setAmount', {
        fromAmount: parseFloat(e.target.value) || 0,
      });
    },
    switchFromTo(this: any) {
      this.$store.dispatch('tokenStore/switchFromTo');
    },

    isSwapBtnDisabled(this: any) {
      const swapInfo = this.$store.getters['tokenStore/swapInfo'];
      return swapInfo.price === 0 || swapInfo.balance < swapInfo.fromAmount;
    },
    swap(this: any) {
      this.$store.dispatch('tokenStore/swap');
    },
  },

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
