import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'

import {en} from './i18n-dictionaries/en.js'
import {es} from './i18n-dictionaries/es.js'

addMessages('en', en)
addMessages('es', es)


init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
})