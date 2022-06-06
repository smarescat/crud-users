<template>
<div>
  <NavBar :user-logged="userLogged"/>
  <Users :user-logged="userLogged"/>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import  Users  from '@/components/Users.vue'
export default {
  name: 'UsersView',
  components: {
    NavBar,
    Users
  },

  data() {
    return {
      userLogged: {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        surname: localStorage.getItem('surname'),
      }
    }
  },
}
</script>

<style>
</style>