import { createStore } from 'vuex'
import EventService from '../services/EventService'

interface State {
  user: String,
  events: event[],
  event: null|event
}

interface event {
  id: Number|String,
  category: String,
  title: String,
  description: String,
  location: String,
  date: String,
  time: String,
  organizer: String
}

export default createStore<State>({
  state: {
    user: 'Robert Miller',
    events: [],
    event: null
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },

    SET_EVENTS(state, events) {
      state.events = events
    },

    SET_EVENT(state, event) {
      state.event = event
    }
  },

  actions: {
    async createEvent({ commit }, event) {
      try {
        await EventService.postEvent(event)
        commit('ADD_EVENT', event)
        commit('SET_EVENT', event)
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async fetchEvents({ commit }) {
      try {
        commit(
          'SET_EVENTS',
          (await EventService.getEvents()).data
        )
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async fetchEvent({ commit, state }, id) {
      const event = state.events.find(event => event.id === id)
      if (event) commit('SET_EVENT', event)
      else {
        try {
          commit(
            'SET_EVENT',
            (await EventService.getEvent(id)).data
          )
        } catch (error) {
          console.log(error)
          throw error
        }
      }
    }
  }
})
