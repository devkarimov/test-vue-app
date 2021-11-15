<template>
  <div class="form">
    <va-form ref="form">
      <va-input
        class="mb-4"
        label="Name"
        v-model="form.name"
        :rules="[value => (value && value.length > 0) || 'Field is required']"
      />
      <va-input
        class="mb-4"
        label="Username"
        v-model="form.username"
      />
      <va-input
        type="email"
        class="mb-4"
        label="Email"
        v-model="form.email"
      />
      <va-input
        class="mb-4"
        label="Address"
        v-model="address"
        @change="addAddress"
      />
      <va-input
        class="mb-4"
        label="Phone"
        v-model="form.phone"
      />
      <va-input
        class="mb-4"
        label="Website"
        v-model="form.website"
      />
      <va-input
        class="mb-4"
        label="Company"
        v-model="form.company.name"
      />
      <div class="submit">
        <va-button @click="submitForm">{{ this.userData ? 'Edit User' : 'Add User' }}</va-button>
      </div>
    </va-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Form',
  data() {
    return {
      address: this.userData ? this.userData.address.street + ', ' +  this.userData.address.suite + ', '  +  this.userData.address.city : '',
      form : {
        id: this.userData ? this.userData.id : '',
        name: this.userData ? this.userData.name : '',
        username: this.userData ? this.userData.username : '',
        email: this.userData ? this.userData.email : '',
        address: {
          street: this.userData ? this.userData.address.street : '',
          suite: this.userData ? this.userData.address.suite : '',
          city: this.userData ? this.userData.address.city : '',
        },
        phone: this.userData ? this.userData.phone : '',
        website: this.userData ? this.userData.website : '',
        company: {
          name: this.userData ? this.userData.company.name : ''
        }
      }
    }
  },
  props: {
    userData: {
      type: Object
    }
  },
  methods: {
    ...mapActions([
      'SET_USER',
      'EDIT_USER'
    ]),
    addAddress() {
      let address = this.address.split(', ').map(word => word)
      this.form.address = {
        street: address[0],
        suite: address[1],
        city: address[2]
      }
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        if (this.userData) {
          this.EDIT_USER(this.form)
        } else {
          this.SET_USER(this.form)
        }

        this.$emit('closeModal')
      }
    }
  }
}
</script>

<style scoped>
  .form {
    width: 400px;
  }

  .submit {
    text-align: center;
  }
</style>
