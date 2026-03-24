import React from 'react';
import styles from './FeaturesSection.module.css';

function FeaturesSection({ features }) {
  return (
    <section id="features" className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>Todo lo que necesitas para un evento inolvidable</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div className={styles.featureCard} key={index}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
