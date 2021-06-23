<template>
  <div>
    <h1 class="text-center">Find recipes by cuisine.</h1>
    <b-form class="form-style" @submit.prevent="onSubmit" style="">
      <div>
        <label for="tags-remove-on-delete"
          >Enter cuisines separated by comma.</label
        >
        <b-form-tags
          input-id="tags-remove-on-delete"
          :input-attrs="{ 'aria-describedby': 'cuisine-tag-help' }"
          v-model="cuisine"
          placeholder="Add cuisine..."
          remove-on-delete
        ></b-form-tags>
        <!-- Validation from vuelidate  -->
        <span
          class="text-danger"
          v-if="!$v.cuisine.required && $v.cuisine.$dirty"
        >
          Cuisine is required!
        </span>
        <b-form-text id="cuisine-tag-help" class="mt-2">
          Example Thai, indian, Greek, French etc.
        </b-form-text>
      </div>
      <div class="errorContainer"></div>
      <b-button type="submit" variant="primary" style="margin-top: 1rem;"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
// https://vuelidate.js.org/#sub-installation
import { required } from "vuelidate/lib/validators";

import { mapActions, mapGetters } from "vuex";
import router from "../router";

export default {
  data() {
    return {
      cuisine: [],
    };
  },
  validations: {
    cuisine: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      errorMessage: "recipes/errorMessage",
    }),
  },
  methods: {
    ...mapActions({
      fetch: "recipes/fetchRecipes",
    }),
    onSubmit() {
      let cuisineNames = "";
      // validation from vuelidate
      this.$v.$touch();

      // calls api when it's valid
      if (!this.$v.$invalid) {
        // makes api call to get recipes by cuisine
        this.fetch({
          type: "cuisine",
          subparam: this.cuisine,
        });

        // changing this.cuisine array to string to pass as params
        cuisineNames += this.cuisine[0];
        this.cuisine.forEach((each, index) => {
          if (index > 0) {
            cuisineNames += "," + this.cuisine[index];
          }
        });

        // takes to Recipes Results Page
        router.push({
          name: "recipesList",
          params: { type: "cuisine", names: cuisineNames },
        });
      }
    },
  },
};
</script>

<style scoped></style>
