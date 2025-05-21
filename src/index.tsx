import 'normalize.css'
import { createRoot } from 'react-dom/client'

import { Logger } from '@mercadona/mo.library.web-services/logger'
import { ServiceWorker } from '@mercadona/mo.library.web-services/service-worker'

import { APM } from 'services/apm'

import { App } from './app'
import './system-ui/styles/index.css'

const {
  VITE_APP_VERSION,
  VITE_APP_SENTRY_ENVIRONMENT,
  VITE_APP_PROJECT,
  VITE_APP_ENV,
  VITE_APP_KIBANA_HOST,
  VITE_APP_SENTRY_DSN,
} = import.meta.env

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)

APM.initialize()
Logger.initialize({
  dsn: VITE_APP_SENTRY_DSN,
  release: VITE_APP_VERSION,
  sentryEnvironment: VITE_APP_SENTRY_ENVIRONMENT,
  kibanaHost: VITE_APP_KIBANA_HOST,
  env: VITE_APP_ENV,
  project: VITE_APP_PROJECT,
})
ServiceWorker.register(ServiceWorker.config)
