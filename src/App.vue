<template>
  <div class="container">
    <div class="row justify--space-between align--center">
      <Header />
      <div class="flex">
        <va-button @click="showAddUserModal = !showAddUserModal" class="mr-2">
          Add User
        </va-button>
        <Search placeholder="Type to search by name..." @onType="search" />
      </div>
    </div>
    <div class="users">
      
      <transition-group name="list">
        <User
          v-for="user in usersData"
          :key="user.id"
          :userData="user"
          @editUser="editUser(user.id)"
          @removeUser="removeUser(user.id)"
        />
      </transition-group>
    </div>
    <va-modal
      v-model="showAddUserModal"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <h4 class="modal-title mb-2">Add user</h4>
      <Form @closeModal="hideAddUserModal" />
    </va-modal>
    <va-modal
      v-model="showEditUserModal"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <h4 class="modal-title mb-2">Edit user</h4>
      <Form @closeModal="hideEditUserModal" :userData="editUserData" />
    </va-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Header from './components/Header/Header.vue'
import Search from './components/Search/Search.vue'
import User from './components/User/User.vue'
import Form from './components/Form/Form.vue'

export default {
  name: 'App',
  components: {
    Header,
    Search,
    User,
    Form
  },
  data() {
    return {
      usersData: [],
      searchValue: '',
      showAddUserModal: false,
      showEditUserModal: false,
      editUserData: ''
    }
  },
  computed: {
    ...mapGetters([
      'USERS'
    ])
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SET_USERS') {
        this.usersData = state.users
      }
    });
  },
  methods: {
    ...mapActions([
      'GET_USERS',
      'REMOVE_USER'
    ]),
    search(value) {
      this.searchValue = value

      let searchData = this.USERS.filter(user => 
        user.name.toLowerCase().includes(value)
      )

      this.usersData = searchData;
    },
    hideAddUserModal() {
      this.showAddUserModal = false
    },
    hideEditUserModal() {
      this.showEditUserModal = false
    },
    editUser(id) {
      this.showEditUserModal = true
      this.editUserData = this.USERS.filter(user => user.id === id)['0']
    },
    removeUser(id) {
      this.REMOVE_USER(id)
    }
  },
  mounted() {
    this.GET_USERS()
      .then(() => this.usersData = this.USERS)
  },
  beforeUnmount() {
    this.unsubscribe();
  },
}
</script>

<style scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .flex {
    display: flex;
  }

  .users {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .modal-title {
    text-align: center;
    font-size: 24px;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.7s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
