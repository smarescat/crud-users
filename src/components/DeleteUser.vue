<template>
  <div>
    <b-modal
      ref="deleteUserModal"
      id="deleteUserModal"
      title="Create user"
      hide-header
      no-close-on-backdrop
    >
      <h5>Do you want to delete "{{ user ? user.name : '' }}"?</h5>
      <template #modal-footer>
        <div>
          <b-button
            variant="danger"
            size="sm"
            class="float-right mr-5"
            @click="deleteUser"
          >
            CONFIRM
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
import api from '@/Api'
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
      message: '',
    };
  },
  methods: {
    deleteUser() {
      api.users().delete(this.user.id).then(() => {
        this.closeModal();
        this.$emit('userMessage', {visible: true, text: 'User deleted correctly'})
        this.$emit('refreshTable');
      });
      
    },
    closeModal() {
      this.$refs["deleteUserModal"].hide();
    },
  },
};
</script>

<style scoped>
.mr-5 {
  margin-right: 5px;
}
</style>