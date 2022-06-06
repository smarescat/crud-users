<template>
  <div>
    <b-modal
      ref="editUserModal"
      id="editUserModal"
      title="Edit user"
      hide-header
      no-close-on-backdrop
    >
      <div class="mt-2">
        <b-form @submit.stop.prevent>
          <label for="name">Name</label>
          <b-form-input
            v-model="userEdit.name"
            :state="validationName"
            id="name"
            @change="updateField('name')"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationName">
            Your name must be longer than 2 characters
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div class="mt-2">
        <b-form @submit.stop.prevent>
          <label for="surnames">Surnames</label>
          <b-form-input
            v-model="userEdit.surnames"
            :state="validationSurname"
            id="surnames"
            @change="updateField('surnames')"
          ></b-form-input>
          <b-form-invalid-feedback :state="validationSurname">
            Your surname must be longer than 5 characters
          </b-form-invalid-feedback>
        </b-form>
      </div>
      <div class="mt-2">
        <b-form @submit.stop.prevent>
          <label for="email">Email</label>
          <b-form-input
            v-model="userEdit.email"
            id="email"
            readonly
          ></b-form-input>
        </b-form>
      </div>
      <div class="mt-2">
        <label for="dateOfBirth">Date of Birthday</label>
        <b-form-datepicker
          v-model="userEdit.dateOfBirth"
          id="dateOfBirth"
          class="mb-2"
          @input="updateField('dateOfBirth')"
        ></b-form-datepicker>
      </div>
      <template #modal-footer>
        <div class="">
          <b-button
            variant=""
            size="sm"
            class="float-right"
            @click="closeModal"
          >
            CLOSE
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import api from '@/Api';

export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showModal: false,
      userEdit: {
        name: "",
        surnames: "",
        email: "",
        dateOfBirth: "",
      },
      password: "",
      newPassword: "",
      repeatPassword: "",
    };
  },
  computed: {
    validationName() {
      return this.userEdit.name.length > 0;
    },
    validationSurname() {
      return this.userEdit.surnames.length > 0;
    },
    validationPassword() {
      return this.password.length > 0;
    },
    validationNewPassword() {
      return this.newPassword.length > 0;
    },
    validationRepeatPassword() {
      return this.newPassword == this.repeatPassword && this.repeatPassword.length > 0;
    },
  },
  methods: {
    closeModal() {
      this.$refs["editUserModal"].hide();
    },
    updateField(field) {
      api.users().update(this.user.id, {[field]: this.userEdit[field]})
    }
  },
  watch: {
    user() {
      this.userEdit = this.user;
    },
  },
};
</script>

<style scoped>
.mr-5 {
  margin-right: 5px;
}
</style>