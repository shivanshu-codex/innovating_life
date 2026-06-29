import { useState, useEffect } from 'react';
import LuminaBg from '../components/LuminaBg';
import Hero from '../components/Hero';
import WellbeingPrinciples from '../components/WellbeingPrinciples';
import FeaturedQuote from '../components/FeaturedQuote';
import Footer from '../components/Footer';
import MoodPicker from '../components/MoodPicker';
import Navbar from '../components/Navbar';
import { useReveal } from '../hooks/useReveal';
import { useMood } from '../hooks/useMood';
import { MetaManager } from '../js/seo/meta-manager';
import { injectSchema, websiteSchema, faqSchema } from '../js/seo/schemas';
import { platformTrustIndicators } from '../data/trust-indicators';

export default function LandingPage() {
  const [moodOpen, setMoodOpen] = useState(false);
  useReveal();
  useMood();

  useEffect(() => {
    MetaManager.forHome();
    injectSchema([websiteSchema, faqSchema]);
  }, []);

  return (
    <>
      <LuminaBg />
      <Navbar onOpenMoodPicker={() => setMoodOpen(true)} />
      <main>
        <Hero />
        <WellbeingPrinciples />
        <section className="trust-indicators reveal-on-scroll" aria-label="Why trust Lumina">
          {platformTrustIndicators.map(({ icon, label }) => (
            <span key={label} className="trust-indicator">
              <span className="trust-indicator__icon" aria-hidden="true">{icon}</span>
              {label}
            </span>
          ))}
        </section>
        <FeaturedQuote />
      </main>
      <Footer />
      {moodOpen && <MoodPicker onClose={() => setMoodOpen(false)} />}
    </>
  );
}
