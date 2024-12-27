import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ru, en } from 'vuetify/locale'

const colorDefault = '#256d68'
const lang = localStorage.getItem('lang') || 'ru'

export const vuetify = createVuetify({
  locale: {
    locale: lang,
    fallback: 'ru',
    messages: { ru, en },
  },
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: colorDefault,
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: false,
        variables: {},
      },
    }
  }
})
