<template>
  <h1>Create an event</h1>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label>Select a category: </label>
      <select v-model="event.category">
        <option v-for="option in categories"
                :value="option"
                :key="option"
                :selected="opition === event.category"
        >{{ option }}</option>
      </select>

      <h3>Name and describe your event</h3>

      <label>Title</label>
      <input v-model="event.title"
             type="text"
             placeholder="Title"
      >

      <label>Description</label>
      <input v-model="event.description"
             type="text"
             placeholder="Description"
      >

      <label>Location</label>
      <input v-model="event.location"
             type="text"
             placeholder="Location"
      >

      <h3>When is your event?</h3>
      
      <label>Date</label>
      <input v-model="event.date"
             type="text"
             placeholder="Date"
      >

      <label>Time</label>
      <input v-model="event.time"
             type="text"
             placeholder="Time"
      >

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Event } from '../types'

export default defineComponent<Event>({
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: this.freshEventObject() as Event
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('createEvent', this.event)
        this.freshEventObject()
        await this.$router.push({
          name: 'EventDetails',
          params: { id: this.event.id }
        })
      } catch (error) {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error }
        })
      }
    },

    freshEventObject(): Event {
      const id: string = uuidv4()
      const user: string = this.$store.state.user

      return {
        id,
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: user
      }
    }
  }
})
</script>
