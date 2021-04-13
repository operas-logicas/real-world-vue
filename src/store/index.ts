import { createStore } from 'vuex'
import EventService from '../services/EventService'

export default createStore({
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
        throw new Error(error)
      }
    },

    async fetchEvents({ commit }) {
      try {
        commit(
          'SET_EVENTS',
          (await EventService.getEvents()).data
        )
      } catch (error) {
        throw new Error(error)
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
          throw new Error(error)
        }
      }
    }
  }
})
