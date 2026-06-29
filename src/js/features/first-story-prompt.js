import { ConversionEvents } from '../analytics/conversion-events.js';
import { requestPushPermission } from './push-notifications.js';

const MOTIVATION_PROMPTS = {
  share: {
    headline:    'You have something to write.',
    prompt:      'What\'s the story that brought you here? Start wherever feels right.',
    placeholder: 'It doesn\'t have to be perfect. It just has to be yours…',
  },
  read: {
    headline:    'You\'re already part of this.',
    prompt:      'Something made you create an account. What was it? Even a few sentences is a story.',
    placeholder: 'What are you looking for right now? What made you arrive here today…',
  },
  connect: {
    headline:    'Your people are here.',
    prompt:      'What\'s something you\'ve been wanting to say to someone who understands?',
    placeholder: 'Start with "I know I\'m not the only one who…"',
  },
  heal: {
    headline:    'The page is yours.',
    prompt:      'What\'s on your mind right now? Writing doesn\'t have to make sense to help.',
    placeholder: 'Just start. Wherever you are. Whatever is there…',
  },
  curious: {
    headline:    'Let\'s see what comes.',
    prompt:      'Write something — anything. A moment from today. A thought you haven\'t finished.',
    placeholder: 'There\'s no wrong way to start…',
  },
};

export function initFirstStoryPrompt(motivation = 'curious') {
  const prompt = MOTIVATION_PROMPTS[motivation] || MOTIVATION_PROMPTS.curious;

  const headline = document.getElementById('write-headline');
  if (headline) headline.textContent = prompt.headline;

  const subline = document.getElementById('write-subline');
  if (subline) subline.textContent = prompt.prompt;

  const textarea = document.querySelector('.write-body');
  if (textarea) textarea.placeholder = prompt.placeholder;

  const banner = document.createElement('div');
  banner.className = 'first-story-banner';
  banner.innerHTML = `
    <div class="first-story-banner__inner">
      <span class="first-story-banner__icon" aria-hidden="true">✦</span>
      <p class="first-story-banner__text">
        Your first story. No pressure — even 3 sentences is a beginning.
      </p>
      <button class="first-story-banner__close" id="first-story-close" aria-label="Dismiss">✕</button>
    </div>
  `;

  const writeArea = document.querySelector('.write-area');
  if (writeArea) writeArea.prepend(banner);

  document.getElementById('first-story-close')?.addEventListener('click', () => banner.remove());

  const timer = setTimeout(() => banner.remove(), 8000);
  document.getElementById('first-story-close')?.addEventListener('click', () => clearTimeout(timer));
}

export async function celebrateFirstStory(storyId) {
  ConversionEvents.firstStoryPublished(
    storyId,
    Math.round((Date.now() - parseInt(localStorage.getItem('lumina_signup_ts') || Date.now(), 10)) / 60000),
  );

  const overlay = document.createElement('div');
  overlay.className = 'first-story-celebration';
  overlay.innerHTML = `
    <div class="first-story-celebration__card">
      <div class="first-story-celebration__confetti" id="confetti-mount"></div>
      <span class="first-story-celebration__icon" aria-hidden="true">✦</span>
      <h2 class="first-story-celebration__title">You did it.</h2>
      <p class="first-story-celebration__body">
        Your first story is out there. That took something.
        Now it can find the people it's meant for.
      </p>
      <div class="first-story-celebration__actions">
        <a href="/story/${storyId}" class="btn btn-primary">
          See your story →
        </a>
        <a href="/explore" class="btn btn-ghost">
          Explore what others wrote
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  if (typeof LuminaParticles !== 'undefined') {
    const mount     = document.getElementById('confetti-mount');
    const particles = new LuminaParticles(mount);
    particles.burst({ count: 40, color: 'soul' });
  }

  setTimeout(() => {
    requestPushPermission({ trigger: 'first_resonance' });
  }, 3000);
}
