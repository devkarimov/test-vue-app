<template>
  <div class="user">
    <ul>
      <li>Name: {{ userData.name }}</li>
      <li>Username: {{ userData.username }}</li>
      <li>Email: {{ userData.email }}</li>
      <li>Address: {{ `${userData.address.street}, ${userData.address.suite}, ${userData.address.city}` }}</li>
      <li>Phone: {{ userData.phone }}</li>
      <li>Website: {{ userData.website }}</li>
      <li>Company: {{ userData.company.name }}</li>
    </ul>
    <div class="mt-2">
      <va-button @click="editUser" size="small" class="mr-2">Edit User</va-button>
      <va-button @click="removeUser" color="danger" size="small">Remove User</va-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    userData: {
      type: Object
    }
  },
  methods: {
    editUser() {
      this.$emit('editUser')
    },
    removeUser() {
      this.$emit('removeUser')
    }
  }
}
</script>

<style scoped>
  .user {
    width: 33.33%;
    padding: 15px;
  }
</style>
