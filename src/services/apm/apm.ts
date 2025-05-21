import { init as initApm } from '@elastic/apm-rum'

const {
  VITE_APP_VERSION,
  VITE_APP_ELASTIC_APM_NAME,
  VITE_APP_ELASTIC_APM_HOST,
} = import.meta.env

function initialize() {
  const config = {
    serviceName: VITE_APP_ELASTIC_APM_NAME,
    serverUrl: VITE_APP_ELASTIC_APM_HOST,
    serviceVersion: VITE_APP_VERSION,
  }

  const apmInstance = initApm(config)
  apmInstance.setInitialPageLoadName(window.location.pathname)
}

export const APM = {
  initialize,
}
