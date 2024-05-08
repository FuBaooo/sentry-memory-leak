import * as Sentry from '@sentry/node'

export default fromNodeMiddleware((req, res, next) => {
  const sentryRequestMiddleware = Sentry.Handlers.requestHandler()
  sentryRequestMiddleware(req, res, next)
})
