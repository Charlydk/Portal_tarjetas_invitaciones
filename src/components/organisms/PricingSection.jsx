import React from 'react';
import styles from './PricingSection.module.css';

function PricingSection({ pricingData }) {
  return (
    <section id="pricing" className={styles.pricingSection}>
      <h2 className={styles.sectionTitle}>Planes para cada tipo de evento</h2>
      <div className={styles.pricingContainer}>
        {pricingData.map((plan, index) => (
          <div className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`} key={index}>
            {plan.popular && <div className={styles.popularBadge}>Más Popular</div>}
            <h3 className={styles.planName}>{plan.plan}</h3>
            <p className={styles.planDescription}>{plan.description}</p>
            <div className={styles.planPrice}>
              {plan.price} <span className={styles.priceUnit}>ARS</span>
            </div>
            <ul className={styles.planFeatures}>
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex}>✓ {feature}</li>
              ))}
            </ul>
            <a href="#contact" className={`${styles.ctaButton} ${styles.planCta}`}>
              Elegir Plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
