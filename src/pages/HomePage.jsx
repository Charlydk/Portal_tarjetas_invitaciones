import React from 'react';
import { features, faqData, pricingData } from '../data/homeData';

import ParticlesBackground from '../components/ParticlesBackground';
import { WaveDivider } from '../components/WaveDivider';
import HeroSection from '../components/organisms/HeroSection';
import DemoSection from '../components/organisms/DemoSection';
import HowItWorksSection from '../components/organisms/HowItWorksSection';
import FeaturesSection from '../components/organisms/FeaturesSection';
import FaqSection from '../components/organisms/FaqSection';
import PricingSection from '../components/organisms/PricingSection';
import TemplatesSection from '../components/organisms/TemplatesSection';
import FinalCtaSection from '../components/organisms/FinalCtaSection';

// Paleta de secciones — rgba para que las partículas se vean a través
const C = {
  hero:     '#1a0a2e',                    // sólido (el hero tiene su propio gradiente)
  white:    'rgba(255,255,255,0.78)',
  blush:    'rgba(253,235,247,0.80)',
  lavender: 'rgba(238,234,255,0.80)',
  dark:     '#0f172a',                    // sólido (CTA)
};

function Section({ bg, children }) {
  return (
    <div style={{ background: bg, position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <div className="homepage" style={{ position: 'relative' }}>
      <ParticlesBackground />

      {/* ── Hero ── */}
      <HeroSection />
      <WaveDivider from={C.hero} to={C.white} />

      {/* ── Demo ── */}
      <Section bg={C.white}>
        <DemoSection />
      </Section>
      <WaveDivider from={C.white} to={C.blush} flip />

      {/* ── Cómo funciona ── */}
      <Section bg={C.blush}>
        <HowItWorksSection />
      </Section>
      <WaveDivider from={C.blush} to={C.white} />

      {/* ── Features ── */}
      <Section bg={C.white}>
        <FeaturesSection features={features} />
      </Section>
      <WaveDivider from={C.white} to={C.lavender} flip />

      {/* ── FAQ ── */}
      <Section bg={C.lavender}>
        <FaqSection faqData={faqData} />
      </Section>
      <WaveDivider from={C.lavender} to={C.white} />

      {/* ── Pricing ── */}
      <Section bg={C.white}>
        <PricingSection pricingData={pricingData} />
      </Section>
      <WaveDivider from={C.white} to={C.blush} flip />

      {/* ── Templates ── */}
      <Section bg={C.blush}>
        <TemplatesSection />
      </Section>
      <WaveDivider from={C.blush} to={C.dark} />

      {/* ── CTA final ── */}
      <FinalCtaSection />
    </div>
  );
}

export default HomePage;
