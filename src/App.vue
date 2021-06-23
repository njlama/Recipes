<template>
  <div id="app">
    <Header />
    <!-- Vue router - check router/index.js page -->
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 320px;
}

.text-center {
  text-align: center;
}

.form-style {
  max-width: 500px;
  margin: 2rem auto;
}
</style>
