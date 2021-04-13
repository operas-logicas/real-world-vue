import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import ErrorDisplay from '../views/ErrorDisplay.vue'
import EventCreate from '../views/EventCreate.vue'
import EventDetails from '../views/EventDetails.vue'
import EventList from '../views/EventList.vue'

const routes = [
  {
    path: '/',
    component: EventList,
    name: 'EventList'
  },
  {
    path: '/about',
    component: About,
    name: 'About'
  },
  {
    path: '/error/:error',
    component: ErrorDisplay,
    name: 'ErrorDisplay',
    props: true
  },
  {
    path: '/event/create',
    component: EventCreate,
    name: 'EventCreate'
  },
  {
    path: '/event/:id',
    component: EventDetails,
    name: 'EventDetails',
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
