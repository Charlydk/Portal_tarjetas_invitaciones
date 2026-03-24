import React from 'react';
import { templates } from '../data/templates';
import { features, faqData, pricingData } from '../data/homeData';

import HeroSection from '../components/organisms/HeroSection';
import DemoSection from '../components/organisms/DemoSection';
import HowItWorksSection from '../components/organisms/HowItWorksSection';
import FeaturesSection from '../components/organisms/FeaturesSection';
import FaqSection from '../components/organisms/FaqSection';
import PricingSection from '../components/organisms/PricingSection';
import TemplatesSection from '../components/organisms/TemplatesSection';
import FinalCtaSection from '../components/organisms/FinalCtaSection';

function HomePage() {
  return (
    <div className="homepage">
      <HeroSection />
      <DemoSection />
      <HowItWorksSection />
      <FeaturesSection features={features} />
      <FaqSection faqData={faqData} />
      <PricingSection pricingData={pricingData} />
      <TemplatesSection templates={templates} />
      <FinalCtaSection />
    </div>
  );
}

export default HomePage;