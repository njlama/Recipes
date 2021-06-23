<template>
  <div class="text-center">
    <h1>Find recipes by:</h1>
    <div>
      <router-link tag="b-button" class="searchButton" :to="{ name: 'cuisine' }"
        >Cuisine</router-link
      >
    </div>
    <div>
      <router-link
        tag="b-button"
        class="searchButton"
        :to="{ name: 'ingredients' }"
        >Ingredients</router-link
      >
    </div>
    <div>
      <router-link
        tag="b-button"
        class="searchButton"
        :to="{ name: 'exclusions' }"
        >Exclusion/intolerance</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.searchButton {
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-width: 250px;
  font-weight: bold;
  font-size: 1.25rem;
  border-radius: 50rem !important;
}
</style>
