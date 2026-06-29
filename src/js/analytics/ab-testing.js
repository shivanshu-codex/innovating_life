import { track } from './conversion-events.js';

const ACTIVE_TESTS = {
  hero_cta: {
    variants: ['start_reading', 'explore_stories', 'come_in'],
    weights:  [0.34, 0.33, 0.33],
    copy: {
      start_reading:   'Start reading →',
      explore_stories: 'Explore stories →',
      come_in:         'Come in →',
    },
  },

  signup_steps: {
    variants: ['three_step', 'two_step'],
    weights:  [0.5, 0.5],
  },

  first_story_copy: {
    variants: ['motivated', 'generic'],
    weights:  [0.5, 0.5],
  },
};

export class ABTest {

  static getVariant(testName) {
    const test = ACTIVE_TESTS[testName];
    if (!test) return null;

    const seed = this._getAssignmentSeed(testName);
    let cumulative = 0;
    for (let i = 0; i < test.variants.length; i++) {
      cumulative += test.weights[i];
      if (seed < cumulative) return test.variants[i];
    }
    return test.variants[0];
  }

  static getCopy(testName) {
    const variant = this.getVariant(testName);
    return ACTIVE_TESTS[testName]?.copy?.[variant] ?? null;
  }

  static trackExposure(testName) {
    const variant = this.getVariant(testName);
    track('ab_exposure', { test: testName, variant });
    return variant;
  }

  static trackConversion(testName, event) {
    const variant = this.getVariant(testName);
    track('ab_conversion', { test: testName, variant, event });
  }

  static _getAssignmentSeed(testName) {
    const anonId = this._getAnonId();
    const str    = `${anonId}:${testName}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash) / 2147483647;
  }

  static _getAnonId() {
    let id = localStorage.getItem('lumina_anon_id');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      localStorage.setItem('lumina_anon_id', id);
    }
    return id;
  }
}
