import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/operas-logicas/real-world-vue',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },

  getEvent(id: Number|String) {
    return apiClient.get(`/events/${id}`)
  },

  postEvent(event: Object) {
    return apiClient.post('/events/', event)
  }
}
