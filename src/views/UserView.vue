<template>
  <div class="d-flex text-center justify-content-center mt-5">
    <b-card
        border-variant="primary"
        header="User"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text> Id: {{ user.id }}</b-card-text>
        <b-card-text> Name: {{ user.name }}</b-card-text>
        <b-card-text> Surnames: {{ user.name }}</b-card-text>
        <b-card-text> Email: {{ user.email }}</b-card-text>
        <b-card-text> Date of Birthday: {{ user.dateOfBirth }}</b-card-text>

        <b-button href="/" variant="primary">Go back</b-button>
      </b-card>
  </div>
</template>

<script>
import api from "@/Api";
export default {
  name: "UserView",
  data() {
    return {
      userLogged: {
        id: localStorage.getItem("id"),
        name: localStorage.getItem("name"),
        surname: localStorage.getItem("surname"),
      },
      user: {
        id: null,
        name: "",
        surnames: "",
        email: "",
        dateOfBirth: "",
      },
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const id = this.$route.params.id;
      console.log(this.$route.params.id);
      api
        .users()
        .getUser(id)
        .then((data) => {
          this.user.id = data.userId;
          this.user.name = data.name;
          this.user.surnames = data.surnames;
          this.user.email = data.email;
          this.user.dateOfBirth = data.dateOfBirth.substring(
            0,
            data.dateOfBirth.indexOf("T")
          );
        });
    },
  },
};
</script>

<style>
</style>