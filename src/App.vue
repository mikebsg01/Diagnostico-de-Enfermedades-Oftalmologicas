<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand href="index.html">
        <img src="logo-uaq-2.png" height="30" class="d-inline-block align-top" alt="Logo UAQ">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link v-show="$route.name !== 'home'" to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <b-nav-item :href="href">
              <i class="fas fa-home"></i>
              Inicio
            </b-nav-item>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>