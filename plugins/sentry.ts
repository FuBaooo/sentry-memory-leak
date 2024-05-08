import * as Sentry from '@sentry/node'

export default defineNitroPlugin((nitro) => {
  Sentry.init({
    dsn: 'https://b4d9714d430077c4b4cb03210cfb459f@o4506991854878720.ingest.us.sentry.io/4506991859990528',
    environment: 'debug',
    sampleRate: 1.0,
    integrations: [
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampler: (samplingContext) => {
      if (samplingContext.parentSampled !== undefined) {
        return samplingContext.parentSampled
      }
      else {
        // return 0.0005
        return 1
      }
    },
  })

  nitro.hooks.hook('error', async (err, { event: _event }) => {
    Sentry.withScope((scope) => {
      scope.addEventProcessor((event) => {
        return Sentry.addRequestDataToEvent(event, _event.node.req)
      })
      Sentry.captureException(err)
    })
  })
})
