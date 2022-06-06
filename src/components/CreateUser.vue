<template>
  <div>
    <b-modal
      ref="createUserModal"
      id="createUserModal"
      title="Create user"
      hide-header
      no-close-on-backdrop
    >
      <div>
        <b-form @submit.stop.prevent>
          <label for="name">Name</label>
          <b-form-input
            v-model="form.name"
            :state="validationName"
            id="name"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationName">
            Is required
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div>
        <b-form @submit.stop.prevent>
          <label for="surnames">Surnames</label>
          <b-form-input
            v-model="form.surnames"
            :state="validationSurname"
            id="surnames"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationSurname">
            Is required
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div>
        <b-form @submit.stop.prevent>
          <label for="email">Email</label>
          <b-form-input
            type="email"
            v-model="form.email"
            :state="validationEmail"
            id="email"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationEmail">
            Is required
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div>
        <b-form @submit.stop.prevent>
          <label for="password">Password</label>
          <b-form-input
            type="password"
            v-model="form.password"
            :state="validationPassword"
            id="password"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationPassword">
            Is required
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div>
        <b-form @submit.stop.prevent>
          <label for="repeatPassword">Repeat password</label>
          <b-form-input
            type="password"
            v-model="form.repeatPassword"
            :state="validationRepeatPassword"
            id="repeatPassword"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationRepeatPassword">
            Yours passwords doesn't match
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div>
        <label for="dateOfBirth">Date of birthday</label>
        <b-form-datepicker
          id="dateOfBirth"
          v-model="form.dateOfBirth"
          class="mb-2"
          :state="validationBirthday"
        ></b-form-datepicker>
      </div>
      <div></div>
      <template #modal-footer>
        <div class="">
          <b-button
            variant="success"
            size="sm"
            class="float-right mr-5"
            @click="createUser"
          >
            CREATE
          </b-button>
          <b-button
            variant=""
            size="sm"
            class="float-right"
            @click="closeModal"
          >
            CANCEL
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import api from "@/Api";

export default {
  data() {
    return {
      showModal: false,
      form: {
        name: "",
        surnames: "",
        email: "",
        password: "",
        repeatPassword: "",
        dateOfBirth: "",
      },
      alertText: "",
    };
  },
  computed: {
    validationRepeatPassword() {
      return (
        this.form.password == this.form.repeatPassword &&
        this.form.repeatPassword.length > 0
      );
    },
    validationPassword() {
      return this.form.password.length > 0;
    },
    validationName() {
      return this.form.name.length > 0;
    },
    validationSurname() {
      return this.form.surnames.length > 0;
    },
    validationEmail() {
      return this.form.email.length > 0;
    },
    validationBirthday() {
      return this.form.dateOfBirth != "";
    },
  },
  methods: {
    createUser() {
      api
        .users()
        .create(this.form)
        .then(() => {
          if (
            this.form.name != "" &&
            this.form.surnames != "" &&
            this.form.email != "" &&
            this.form.password != "" &&
            this.form.repeatPassword != "" &&
            this.form.dateOfBirth != "" &&
            this.form.password == this.form.repeatPassword
          ) {
            this.closeModal();
            this.$emit("userMessage", {
              visible: true,
              text: "Added Correctly",
            });
            this.$emit("refreshTable");
          }
        })
        .catch(({ data }) => {
          this.errorMessage = data;
        });
    },
    closeModal() {
      this.$refs["createUserModal"].hide();
      (this.form.name = ""),
        (this.form.surnames = ""),
        (this.form.email = ""),
        (this.form.password = ""),
        (this.form.repeatPassword = ""),
        (this.form.dateOfBirth = "");
    },
  },
};
</script>

<style scoped>
.mr-5 {
  margin-right: 5px;
}
</style>