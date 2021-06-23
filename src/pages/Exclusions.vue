<template>
  <div>
    <h1 class="text-center">
      Find recipes by exclude ingredients and/or by intolerance.
    </h1>
    <b-form class="form-style" @submit.prevent="onSubmit">
      <div>
        <label for="tags-remove-on-delete"
          >Enter exclude ingredients separated by comma.</label
        >
        <b-form-tags
          input-id="tags-remove-on-delete"
          :input-attrs="{ 'aria-describedby': 'exclude-tag-help' }"
          v-model="form.exclusions"
          placeholder="Add exclude ingredients..."
          remove-on-delete
        ></b-form-tags>
        <!-- Validation from vuelidate  -->
        <span
          class="text-danger"
          v-if="!$v.form.customValidator && $v.form.$dirty"
        >
          Exclusions is required!
        </span>
        <b-form-text id="exclude-tag-help" class="mt-2">
          Ingredients that the recipes must not contain.
        </b-form-text>
      </div>
      <div style="margin-top: 2rem;">
        <label for="tags-remove-on-delete"
          >Enter intolerance separated by comma.</label
        >
        <b-form-tags
          input-id="tags-remove-on-delete"
          :input-attrs="{ 'aria-describedby': 'intolerance-tag-help' }"
          v-model="form.intolerance"
          placeholder="Add intolerance..."
          remove-on-delete
        ></b-form-tags>
        <!-- Validation from vuelidate  -->
        <span
          class="text-danger"
          v-if="!$v.form.customValidator && $v.form.$dirty"
        >
          Intolerance is required!
        </span>
        <b-form-text id="intolerance-tag-help" class="mt-2">
          Example dairy, gluten, meat, etc.
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
import { helpers } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import router from "../router";

// custom vuelidate validators
const customValidator = (value) => {
  if (value.exclusions.length > 0 || value.intolerance.length > 0) {
    return helpers.req(value); // true when either one is entered
  } else {
    return !helpers.req(value); // false when both field is empty
  }
};

export default {
  data() {
    return {
      form: {
        exclusions: [],
        intolerance: [],
      },
    };
  },
  validations: {
    form: {
      customValidator,
    },
  },
  methods: {
    ...mapActions({
      fetch: "recipes/fetchRecipesByExcludeIntolerance",
    }),
    onSubmit() {
      let formattedNames = "";
      let formattedTypes = "";

      // validation from vuelidate
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // formatting payload for  api call
        let payload = [];
        if (this.form.exclusions.length > 0) {
          payload.push({
            type: "excludeIngredients",
            subparam: this.form.exclusions,
          });
        }
        if (this.form.intolerance.length > 0) {
          payload.push({
            type: "intolerances",
            subparam: this.form.intolerance,
          });
        }
        // api call to get recipes by exclusion and/or intolerances
        this.fetch(payload);

        // formating query for RecipesList page
        if (this.form.exclusions.length > 0) {
          formattedNames += this.form.exclusions.join();
          formattedTypes += "excludeIngredients";
        }
        if (this.form.intolerance.length > 0) {
          if (formattedTypes != "") {
            formattedNames += "+";
            formattedTypes += "+";
          }
          formattedNames += this.form.intolerance.join();
          formattedTypes += "intolerances";
        }
        // takes to Recipes Results Page
        router.push({
          name: "recipesList",
          params: { type: formattedTypes, names: formattedNames },
        });
      }
    },
  },
};
</script>

<style scoped></style>
