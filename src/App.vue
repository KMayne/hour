<template>
  <div id="app">
    <button @click="numberClicked" class="fullscreen">#: {{ number }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    number: 0
  }),
  methods: {
    numberClicked() {
      this.number++;
    }
  }
});
</script>

<style>
.fullscreen {
  width: 100vw;
  height: 100vh;
}
</style>
