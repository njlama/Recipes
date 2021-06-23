import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/',name: 'home' , component: () => import('@/pages/Home.vue') },
  { path: '/cuisine', name: 'cuisine', component: () => import('@/pages/Cuisine.vue')},
  { path: "/ingredients", name: 'ingredients', component: () => import('@/pages/Ingredients.vue')},
  { path: "/exclusions", name: 'exclusions', component: () => import('@/pages/Exclusions.vue')},
  { path: "/recipes/:type/:names", name: 'recipesList', component: () => import('@/pages/RecipesList.vue')},
  { path: "/recipes-details/:id", name: 'recipesDetails', component: () => import('@/pages/RecipesDetails.vue')},
];

const router = new VueRouter({
    mode: "history", 
    routes
})

export default router;