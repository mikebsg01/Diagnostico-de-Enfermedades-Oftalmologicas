<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-light bg-light">
      <a class="navbar-brand" href="index.html">
        <img src="logo-uaq-2.png" height="30" class="d-inline-block align-top" alt="Logo UAQ">
      </a>
    </nav>
    <div class="app-navbar-space"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>