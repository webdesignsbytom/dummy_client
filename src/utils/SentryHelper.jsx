// sentrySetup.js
import * as Sentry from "@sentry/react"; // Import Sentry

export const SentryHelper = () => {
  Sentry.init({
    dsn: "https://cc852dd6a3ccefcf006e1745ef555a20@o4507952901455872.ingest.de.sentry.io/4507952904798288",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0, // Adjust sample rate for production
    profilesSampleRate: 1.0, // Profiling sample rate
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/], // Adjust this for your environment
    replaysSessionSampleRate: 0.1, // Adjust session replay sample rate
    replaysOnErrorSampleRate: 1.0, // 100% replay on error
  });
};
