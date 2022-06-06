<template>
  <div>
    <div v-if="isLoading">
      <img src="../assets/loading.gif" alt="" />
    </div>
    <div v-else>
      <b-button class="d-flex mr-20" variant="success" v-b-modal.createUserModal
        ><b-icon icon="plus" aria-hidden="true"></b-icon>New user</b-button
      >
      <b-card no-body class="text-center mr-20 p-15">
        <PopUp :visible="popUp.visible" :text="popUp.text" />
        <b-table
          id="userTable"
          :items="items"
          :fields="fields"
          striped
          hover
          :per-page="perPage"
          :current-page="currentPage"
          small
        >
          <template #cell(id)="data">
            <b-link :href="`/user/${data.item.id}`">{{ data.item.id }}</b-link>
          </template>
          <template #cell(actions)="data">
            <b-button
              size="sm"
              variant="outline-warning"
              class="mr-5"
              @click="useUser(data.item, 'editUserModal')"
            >
              <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              variant="outline-danger"
              v-show="data.item.id != userLogged.id"
              @click="useUser(data.item, 'deleteUserModal')"
            >
              <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
            </b-button>
          </template>
        </b-table>
      </b-card>
    </div>
    <div class="overflow-auto d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="userTable"
        class="customPagination"
      ></b-pagination>
    </div>
    <CreateUser @userMessage="userMessage" @refreshTable="refresh" />
    <EditUser :user="user" />
    <DeleteUser
      :user="user"
      @userMessage="userMessage"
      @refreshTable="refresh"
    />
  </div>
</template>

<script>
import api from "@/Api";
import CreateUser from "@/components/CreateUser.vue";
import DeleteUser from "@/components/DeleteUser.vue";
import EditUser from "@/components/EditUser.vue";
import PopUp from "@/components/PopUp.vue";

export default {
  name: "UsersComponenet",
  components: {
    CreateUser,
    EditUser,
    DeleteUser,
    PopUp,
  },
  props: {
    userLogged: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      isLoading: true,
      users: "",
      user: null,
      perPage: 5,
      currentPage: 1,
      ok: false,
      popUp: {
        visible: false,
        text: null,
      },

      fields: [
        {
          key: "id",
          label: "Id",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "surnames",
          label: "Surnames",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "dateOfBirth",
          label: "Day of Birthday",
        },
        { key: "actions" },
      ],
      items: [],
    };
  },

  computed: {
    rows() {
      return this.items.length;
    },
  },

  methods: {
    getValue() {
      this.ok = true;
    },
    getUsers() {
      api
        .users()
        .getUsers()
        .then(({ data }) => {
          this.users = data;
          this.transfromDataForTable();
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    transfromDataForTable() {
      this.items = this.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          surnames: user.surname,
          email: user.email,
          dateOfBirth: user.date_of_birth.substring(
            0,
            user.date_of_birth.indexOf(" ")
          ),
        };
      });
    },
    useUser(user, modal) {
      this.user = user;
      this.$root.$emit("bv::show::modal", modal);
    },
    userMessage(popUpData) {
      this.popUp.visible = popUpData.visible;
      this.popUp.text = popUpData.text;
    },

    refresh() {
      this.getUsers();
    },
  },
};
</script>

<style scoped>
.mr-5 {
  margin-right: 5px;
}

.mr-20 {
  margin: 20px;
}
.p-15 {
  padding: 15px;
}
</style>