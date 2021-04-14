import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State, Event } from './types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
    event: Event;
    freshEventObject: function
  }
}
