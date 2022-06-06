<template>
  <div
    class="row d-flex justify-content-center align-items-center h-100"
    style="padding-bottom: 4rem !important"
  >
    <b-card
      class="mt-5 col-lg-4 col-md-8 col-sm-8 p-5 shadow-lg user-select-none"
      no-body
    >
      <b-card-body class="p-0">
        <h3>Welcome to the CRUD</h3>
        <b-form @submit.prevent="login">
          <div class="mt-5 form-floating user-select-none">
            <b-form-input
              id="email"
              type="text"
              placeholder="Email"
              v-model="form.email"
              required
            />
            <label class="user-select-none" for="input-user"> Email </label>
          </div>
          <div class="form-floating mt-4 user-select-none">
            <span
              role="button"
              class="position-absolute"
              style="top: 50%; right: 10px; transform: translateY(-50%)"
            >
              <b-icon aria-hidden="true"></b-icon>
            </span>
            <b-form-input
              id="password"
              placeholder="Password"
              class="input-password"
              type="password"
              v-model="form.password"
              required
            />
            <label class="user-select-none" for="input-password">
              Password
            </label>
          </div>
          <label v-show="errorMessage" class="text-danger user-select-none mt-2">
            <b-icon icon="info-circle" aria-hidden="true"></b-icon>
             {{ errorMessage }} 
          </label>
          <b-button type="submit" variant="primary" class="w-100 mt-5">
            <span>Sign in</span>
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import api from "@/Api";
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      errorMessage: '',
    };
  },
  mounted() {
    document.title = "Login - User";
  },
  methods: {
    login() {
      api.auth().login({ ...this.form }).then((data) => {
        api.setAuthData(data);
        this.$router.push({name: 'users'})
      }).catch((error) => {
        this.errorMessage = error.errorData;
      });
    },
  },
};
</script>

<style scoped></style>;
