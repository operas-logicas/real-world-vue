<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Event } from '../types'

export default defineComponent({
  props: {
    'id': {
      type: String,
      required: true
    }
  },

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
    event(): Event {
      return this.$store.state.event
    }
  }
})
</script>
