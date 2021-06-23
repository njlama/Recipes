<template>
  <div id="detail-page" class="container">
    <!-- Error Message for network error -->
    <div v-if="error">{{ error }}</div>
    <!-- Display detail page -->
    <div v-else>
      <h3 class="title">{{ recipesDetails.title }}</h3>
      <b-button variant="outline-warning" @click="printRecipes"
        >Print<b-icon icon="printer" style="margin-left:5px;"></b-icon
      ></b-button>

      <div class="row my-4 heroContainer">
        <div class="col-lg-5">
          <img :src="recipesDetails.image" />

          <div class="row serving-time">
            <p class="col-6">{{ recipesDetails.servings }} Servings</p>
            <p class="col-6">{{ recipesDetails.readyInMinutes }} Mins</p>
          </div>
        </div>
        <div class="col-lg-6 summary">
          <!-- api summary contains raw-html so rendering with v-html -->
          <p v-html="recipesDetails.summary"></p>
        </div>
      </div>
      <div class="row">
        <!-- Ingredients -->
        <div id="ingredients" class="col-lg-5">
          <h5>Ingredients</h5>
          <ol>
            <li
              v-for="each in formattedIngredients"
              :key="each.id"
              class="ingredient-item"
            >
              {{ each }}
            </li>
          </ol>
        </div>
        <!-- Instructions -->
        <div
          id="instructions"
          class="col-lg-6"
          v-if="formattedInstructions.length > 0"
        >
          <h5>How to make {{ recipesDetails.title }} (Step By Step)</h5>
          <ol>
            <li
              class="instruction-step"
              v-for="each in formattedInstructions"
              :key="each.id"
            >
              {{ each }}
            </li>
          </ol>
        </div>
        <div v-else>
          <h5 style="font-style:italic">
            Instruction for this recipes is not available.
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: [],
  data() {
    return {
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;

    this.fetchRecipesDetails(this.id);
  },
  computed: {
    ...mapGetters({
      recipesDetails: "recipes/recipesDetails",
      detailError: "recipes/detailError",
    }),
    formattedIngredients: function() {
      // bunding all available ingredient to an array
      let ingredients = [];
      if (!this.recipesDetails.extendedIngredients) return;
      let extendedIngredients = this.recipesDetails.extendedIngredients;

      extendedIngredients.forEach((ingre) => {
        ingredients.push(ingre.original);
      });

      return ingredients;
    },
    formattedInstructions: function() {
      // filtering just the instruction steps from analyzedInstructions
      let instructions = [];

      // return if analyzedInstructions is not available;
      if (!this.recipesDetails.analyzedInstructions) return [];

      if (this.recipesDetails.analyzedInstructions.length > 0) {
        if (!this.recipesDetails.analyzedInstructions[0].steps) return;
        let steps = this.recipesDetails.analyzedInstructions[0].steps;
        steps.forEach((each) => {
          instructions.push(each.step);
        });
      }
      return instructions;
    },
    error: function() {
      // Network error
      if (!this.detailError) return;
      return this.detailError;
    },
  },
  methods: {
    ...mapActions({
      fetchRecipesDetails: "recipes/fetchRecipesDetails",
    }),
    printRecipes() {
      // Print recipes
      window.print();
    },
  },
};
</script>

<style scoped>
a {
  color: #343a40;
  text-decoration: none;
}

img {
  max-width: 100%;
}

.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
}

.summary {
  margin-top: 2rem;
}

#apple > a {
  color: red;
}

#ingredients,
#instructions {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#ingredients > ol {
  list-style-type: none;
  padding-inline-start: 0px;
}

.ingredient-item {
  border-bottom: 2px solid #ececec;
  padding: 8px 0;
  text-decoration: none;
}

.instruction-step {
  padding: 8px 0;
  text-decoration: none;
}

.serving-time {
  text-align: center;
  border-bottom: 2px solid #ececec;
  border-top: 2px solid #ececec;
  margin: 1rem;
}

.serving-time > p {
  margin-top: 1rem;
}

@media (min-width: 992px) {
  .title {
    margin-bottom: 3rem;
    font-size: 2rem;
  }

  .summary {
    margin-top: 0rem;
  }

  .summary > p,
  .ingredient-item,
  .instruction-step {
    font-size: 1.125rem;
  }

  #ingredients,
  #instructions {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  #ingredients > h5 {
    margin-bottom: 2rem;
  }

  #ingredients > h5,
  #instructions > h5 {
    font-size: 1.5rem;
  }

  .ingredient-item {
  }
}
</style>
