/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export function registerPlugins (app) {
  app.use(vuetify)
  app.component('VueDatePicker', VueDatePicker);
}
