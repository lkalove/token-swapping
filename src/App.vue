<template>
  <div id='nav'>
    <p class="toggle-theme {{theme}}" v-on:click=setBodyClass>Theme: {{theme === 'theme-light' ? "Light" : "Dark"}}</p>
    <router-link to='/'>Swap</router-link>
    |
    <router-link to='/account'>Account</router-link>
  </div>
  <router-view />
</template>

<style lang='scss'>
@import '@/assets/styles/main.scss';
</style>
<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    initBodyClass(className: string) {
      document.body.setAttribute('class', className);
    },
    setBodyClass() {
      const newTheme = document.body.className.includes('theme-light') ? "theme-dark" : "theme-light";
      document.body.className = newTheme;
      localStorage.setItem("swap-theme", newTheme);
      this.theme = newTheme;
    },
  },
  data() {
    return {
      theme: localStorage.getItem('swap-theme')
    }
  },
  mounted() {
    // get the previous setup from the localStorage
    const theme = localStorage.getItem('swap-theme');
    this.initBodyClass(theme || "theme-light");
  },
});
</script>