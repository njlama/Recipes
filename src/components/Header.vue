<template>
  <div id="header">
    <b-navbar toggleable="lg" type="dark" variant="warning">
      <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->
      <div class="container">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'home' }">HOME</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'cuisine' }">Cuisine</b-nav-item>
            <b-nav-item :to="{ name: 'ingredients' }">Ingrdients</b-nav-item>
            <b-nav-item :to="{ name: 'exclusions' }"
              >Exclusions/Intolerances</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: black;
}

#header {
  margin-bottom: 55px;
}
</style>
