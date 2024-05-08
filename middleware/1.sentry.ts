import * as Sentry from '@sentry/node'

export default fromNodeMiddleware((req, res, next) => {
  const sentryTracingMiddleware = Sentry.Handlers.tracingHandler()
  sentryTracingMiddleware(req, res, next)

  // handle memory leak
  res.on('finish', () => {
    setImmediate(() => {
      Sentry.getCurrentScope()?.clear()
    })
  })
})
