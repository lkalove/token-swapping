<template>
  <div id='nav'>
    <p class='toggle-theme {{theme}}' v-on:click=setBodyClass>Theme:
      {{ theme === 'theme-light' ? 'Light' : 'Dark' }}</p>
    <p class='account'>{{ accountInfo.address }}</p>
  </div>
  <router-view />
</template>

<style lang='scss'>
@import '@/assets/styles/main.scss';
</style>
<script lang='ts'>
import { defineComponent } from 'vue';
import isEmpty from 'is-empty';

export default defineComponent({
  name: 'App',
  methods: {
    initBodyClass(className: string) {
      document.body.setAttribute('class', className);
    },
    setBodyClass() {
      const newTheme = document.body.className.includes('theme-light') ? 'theme-dark' : 'theme-light';
      document.body.className = newTheme;
      localStorage.setItem('swap-theme', newTheme);
      this.theme = newTheme;
    },
  },
  computed: {
    accountInfo(this: any) {
      return this.$store.getters['accountStore/accountInfo'];
    },
  },
  created(this: any) {
    if (isEmpty(this.$store.getters['accountStore/accountInfo'].address)) {
      this.$store.dispatch('accountStore/fetchAccountInfo');
    }
  },
  data() {
    return {
      theme: localStorage.getItem('swap-theme'),
    };
  },
  mounted() {
    // get the previous setup from the localStorage
    const theme = localStorage.getItem('swap-theme');
    this.initBodyClass(theme || 'theme-light');
  },
});
</script>