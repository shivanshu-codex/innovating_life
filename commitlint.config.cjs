module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'perf', 'a11y', 'style', 'refactor',
      'test', 'docs', 'chore', 'ci', 'revert',
    ]],
    'scope-enum': [1, 'always', [
      'visual', 'components', 'pwa', 'writing', 'copy',
      'seo', 'trust', 'engagement', 'conversion', 'a11y',
      'brand', 'infra', 'db', 'auth', 'notifications',
      'streak', 'feed', 'search', 'email', 'push',
    ]],
    'subject-max-length': [2, 'always', 72],
  },
};
