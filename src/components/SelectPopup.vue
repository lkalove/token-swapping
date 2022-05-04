<template>
  <div v-if='isVisible' class='token-list-wrapper' v-on:click=closePopup>
    <div class='token-list'>
      <div class='header' v-on:click.stop.prevent>
        Select Token
      </div>
      <div class='body'>
        <div class='token-list' v-for='token in tokens' :key='token' @click='selectToken(token.name)'>
          <div class='token-name'>{{ token.name }}</div>
          <div class='token-balance'>{{ token.balance }}</div>
        </div>
      </div>
      <div class='footer' v-on:click=closePopup>close</div>
    </div>
  </div>
</template>

<style lang='scss'>
@import '@/assets/styles/popup.scss';
</style>

<script lang='ts'>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SelectPopup',
  computed: {
    isVisible(this: any) {
      return this.$store.getters['popupStore/isVisible'];
    },
    tokens(this: any) {
      return this.$store.getters['tokenStore/tokens'];
    },
  },
  methods: {
    closePopup(this: any) {
      this.$store.dispatch('popupStore/closePopup');
    },
    selectToken(this: any, value: string) {
      this.$store.dispatch('tokenStore/selectToken', { type: this.$store.getters['popupStore/type'], value });
      this.closePopup();
    },
  },
});
</script>