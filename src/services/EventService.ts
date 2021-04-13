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

  getEvent(id: string) {
    return apiClient.get(`/events/${id}`)
  },

  postEvent(event: object) {
    return apiClient.post('/events/', event)
  }
}
