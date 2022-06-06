<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="py-0">
    <!--LOGO-->
    <b-navbar-brand href="/">
      <h3>Crud-Users</h3>
    </b-navbar-brand>
    <!--COLAPSE-->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="w-100">
        <!--CERRAR SESION-->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown class="ml-2">
          <template #button-content>
            <em class="mr-2">{{ userLogged.name }}</em>
          </template>
          <b-dropdown-item @click="logout"
            ><i class="fa-solid fa-right-from-bracket mr-2"></i>Sign
            out</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import api from "@/Api"

export default {
  name: "NavBarComponent",
  props: {
    userLogged: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      api.resetAuthData();
      this.$router.push({name: 'login'})
    }
  }
};
</script>

<style scoped>
.dropdown-menu .show {
  right: 50px !important;
}
</style>
