<template>
  <div class='home'>
    <Swap />
    <SelectPopup />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Swap from '@/components/Swap.vue'; // @ is an alias to /src
import SelectPopup from '@/components/SelectPopup.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Swap,
    SelectPopup,
  },
});
</script>
