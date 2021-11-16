<template>
  <div class="search-block">
    <va-input
      :placeholder="placeholder"
       v-model="inputText"
       @input="search"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      inputText: '',
      searchData: []
    }
  },
  props: {
    placeholder: {
      type: String,
      default: () => 'Search'
    }
  },
  methods: {
    search() {
      this.$emit('onType', this.inputText.toLowerCase())
    }
  }
}
</script>

<style scoped>
  
</style>
