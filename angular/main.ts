require('core-js/client/shim')
require('zone.js')

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './modules/app'

platformBrowserDynamic().bootstrapModule(AppModule)
