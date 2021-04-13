<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['id'],

  async created() {
    try {
      await this.$store.dispatch('fetchEvent', this.id)
    } catch (error) {
      await this.$router.push({
        name: 'ErrorDisplay',
        params: { error }
      })
    }
  },

  computed: {
    event() {
      return this.$store.state.event
    }
  }
})
</script>
