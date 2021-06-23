<template>
  <b-card-group deck>
    <router-link :to="{ name: 'recipesDetails', params: { id: recipes.id } }">
      <b-card
        :img-src="recipes.image"
        img-alt="Recipes image"
        img-top
        tag="article"
        style="max-width: 20rem;height: 370px;"
        class="mb-4"
      >
        <b-card-title>
          {{ recipes.title }}
        </b-card-title>
      </b-card>
    </router-link>
  </b-card-group>
</template>

<script>
export default {
  props: ["recipes"],
  created() {},
};
</script>

<style scoped>
a {
  color: #343a40;
  text-decoration: none;
}
</style>
