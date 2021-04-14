import { createStore } from 'vuex'
import { State, Event } from '../types'
import EventService from '../services/EventService'

export default createStore<State>({
  state: {
    user: 'Robert Miller',
    events: [] as Event[],
    event: null as unknown as Event
  },

  mutations: {
    ADD_EVENT(state, event: Event) {
      state.events.push(event)
    },

    SET_EVENTS(state, events: Event[]) {
      state.events = events
    },

    SET_EVENT(state, event: Event) {
      state.event = event
    }
  },

  actions: {
    async createEvent({ commit }, event: Event) {
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

    async fetchEvent({ commit, state }, id: string) {
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
