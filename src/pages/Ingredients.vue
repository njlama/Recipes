<template>
  <div>
    <h1 class="text-center">Find recipes by ingredients.</h1>
    <b-form class="form-style" @submit.prevent="onSubmit">
      <div>
        <label for="tags-remove-on-delete"
          >Enter ingredients separated by comma.</label
        >
        <b-form-tags
          input-id="tags-remove-on-delete"
          :input-attrs="{ 'aria-describedby': 'ingredients-tag-help' }"
          v-model="ingredients"
          placeholder="Add ingredients..."
          remove-on-delete
        ></b-form-tags>
        <!-- Validation from vuelidate  -->
        <span
          class="text-danger"
          v-if="!$v.ingredients.required && $v.ingredients.$dirty"
        >
          Ingredients are required!
        </span>
        <span
          class="text-danger"
          v-if="!$v.ingredients.minIngredientValidator && $v.ingredients.$dirty"
        >
          Minimun of 3 ingredients are required!
        </span>
        <b-form-text id="ingredients-tag-help" class="mt-2">
          Enter at least 3 ingredients.
        </b-form-text>
      </div>
      <b-button type="submit" variant="primary" style="margin-top: 1rem;"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
// https://vuelidate.js.org/#sub-installation
import { required, helpers } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import router from "../router";

// custom vuelidate validators
const minIngredientValidator = (value) => {
  if (value.length >= 3) {
    return helpers.req(value); // true when ingredient is at least 3
  } else {
    return !helpers.req(value); // false when ingredient is < 3
  }
};

export default {
  data() {
    return {
      ingredients: [],
    };
  },
  validations: {
    ingredients: {
      required,
      minIngredientValidator,
    },
  },
  computed: {
    ingredientsPayload: function() {
      let ingred = "";

      // changing ingredients array to string to pass as params
      ingred += this.ingredients[0];
      this.ingredients.forEach((each, index) => {
        if (index > 0) {
          ingred += "," + this.ingredients[index];
        }
      });

      return ingred;
    },
  },
  methods: {
    ...mapActions({
      fetch: "recipes/fetchRecipes",
    }),
    onSubmit() {
      // validation from vuelidate
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // fetch recipes
        this.fetch({
          type: "ingredients",
          subparam: this.ingredients,
        });

        // routes to Recipes Results Page
        // this.ingredientsPayload : computed property
        router.push({
          name: "recipesList",
          params: { type: "ingredients", names: this.ingredientsPayload },
        });
      }
    },
  },
};
</script>

<style scoped></style>
