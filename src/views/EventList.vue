<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Event } from '../types'
import EventCard from '../components/EventCard.vue'

export default defineComponent({
  name: 'EventList',
  
  components: {
    EventCard
  },

  async created() {
   try {
     await this.$store.dispatch('fetchEvents')
   } catch (error) {
     this.$router.push({
       name: 'ErrorDisplay',
       params: { error }
     })
   }
  },

  computed: {
    events(): Event[] {
      return this.$store.state.events
    }
  }
})
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
