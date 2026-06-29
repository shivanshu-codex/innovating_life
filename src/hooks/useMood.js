import { useState, useEffect } from 'react';

const MOODS = ['calm', 'bloom', 'forest', 'dusk', 'ocean'];

export function useMood() {
  const [mood, setMood] = useState(() => {
    return localStorage.getItem('lumina_mood') || 'calm';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-mood', mood);
    localStorage.setItem('lumina_mood', mood);
  }, [mood]);

  return { mood, setMood, MOODS };
}
