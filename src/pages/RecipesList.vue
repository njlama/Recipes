<template>
  <div id="recipes-results" class="container">
    <h1>
      Recipes
    </h1>
    <!-- Error Message for Empty Results -->
    <div v-if="error == '' && recipesResults.length == 0">
      <h6>Sorry, there is no results for your search.</h6>
    </div>

    <!-- Display  Results -->
    <div class="row" v-else-if="recipesResults.length > 0">
      <!-- Goes in loop to print results -->
      <div
        v-for="recipes in recipesResults"
        :key="recipes.id"
        class="col-xm-12 col-md-4 offset-1 offset-sm-2  offset-md-0 recipes-group-item"
      >
        <!--Rendering component and passing each recipes as props-->
        <RecipesShortDescription :recipes="recipes" />
      </div>
    </div>

    <!-- Error Message for network error -->
    <div v-else-if="error">{{ error }}</div>
  </div>
</template>

<script>
// Getters from store
import { mapGetters, mapActions } from "vuex";
import RecipesShortDescription from "@/components/recipesShortDescp";

export default {
  name: "RecipesResults",
  components: {
    RecipesShortDescription,
  },
  data() {
    return {};
  },
  created() {
    console.log("query.results", this.$route.params.names);
    let type = this.$route.params.type;
    let names = this.$route.params.names;
    console.log("type", type);
    if (type == "cuisine" || type == "ingredients") {
      // fetching recipes
      this.fetch({
        type: type,
        subparam: names,
      });
    } else {
      let formattedPayload = [];
      console.log(type.split("+")[0], names.split("+")[0]);
      console.log(type.split("+")[1], names.split("+")[1]);
      formattedPayload.push({
        type: type.split("+")[0],
        subparam: names.split("+")[0],
      });
      if (type.split("+").length > 1) {
        formattedPayload.push({
          type: type.split("+")[1],
          subparam: names.split("+")[1],
        });
      }

      // fetch recipes by exclusion and/or intolerances
      this.fetchByExcludeIntolerances(formattedPayload);
    }
  },
  computed: {
    // mapping getters to this vue instance
    ...mapGetters({
      recipesResults: "recipes/recipes",
      errorMessage: "recipes/errorMessage",
    }),
    error: function() {
      if (!this.errorMessage) return;
      return this.errorMessage;
    },
  },
  methods: {
    // mapping actions to this vue instance
    ...mapActions({
      fetch: "recipes/fetchRecipes",
      fetchByExcludeIntolerances: "recipes/fetchRecipesByExcludeIntolerance",
    }),
  },
};
</script>

<style scoped>
/* Using /deep/ to target inner bootstrap-vue styles */
</style>
