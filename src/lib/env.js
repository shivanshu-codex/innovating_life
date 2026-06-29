const required = (key) => {
  const val = import.meta.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
};

export const env = {
  supabaseUrl:       required('VITE_SUPABASE_URL'),
  supabaseAnonKey:   required('VITE_SUPABASE_ANON_KEY'),
  appUrl:            import.meta.env.VITE_APP_URL       || 'http://localhost:3000',
  appName:           import.meta.env.VITE_APP_NAME      || 'Lumina',
  vapidPublicKey:    import.meta.env.VITE_VAPID_PUBLIC_KEY || '',
  sentryDsn:         import.meta.env.VITE_SENTRY_DSN    || '',
  features: {
    push:          import.meta.env.VITE_FEATURE_PUSH_NOTIFICATIONS === 'true',
    yearlyReview:  import.meta.env.VITE_FEATURE_YEARLY_REVIEW      === 'true',
    referrals:     import.meta.env.VITE_FEATURE_REFERRALS          === 'true',
  },
  analyticsEndpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT || '/api/analytics',
  isDev:  import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
