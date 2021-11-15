// import Vue from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import 'es6-promise/auto'

const store = createStore({
  state: {
    users: [],
    count: 0
  },
  mutations: {
    SET_USERS: (state, payload) => {
      state.users = payload
    },
    increment: state => {
      state.count++
    }
  },
  actions: {
    GET_USERS({ commit }) {
      axios.get('/users/')
        .then(users => {
          commit('SET_USERS', users.data)
        })
        .catch(err => console.log(err))
    },
    SET_USER({ commit }, payload) {
      axios.post('/users', payload)
        .then(res => {
          commit('SET_USERS', [...this.state.users, res.data])
        })
        .catch(err => console.log(err))
    },
    REMOVE_USER({ commit }, payload) {
      axios.delete(`/users/${payload}`)
        .then(() => {
          commit('SET_USERS', [...this.state.users.filter(user => user.id !== payload)])
        })
        .catch(err => console.log(err))
    },
    EDIT_USER({ commit }, payload) {
      axios.put(`/users/${payload.id}`, payload)
        .then(() => {
          let usersList = this.state.users
          let userIndex = usersList.findIndex((user => user.id === payload.id))

          usersList[userIndex] = payload

          commit('SET_USERS', [...usersList])
        })
        .catch(err => console.log(err))
    },
  },
  getters: {
    USERS: state => state.users
  }
})

export default store
