import React from 'react';
import AccordionItem from '../AccordionItem';
import styles from './FaqSection.module.css';

function FaqSection({ faqData }) {
  return (
    <section id="faq" className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>¿Tienes Dudas? Las Resolvemos</h2>
      <div className={styles.accordionContainer}>
        {faqData.map((item, index) => (
          <AccordionItem 
            key={index} 
            question={item.q} 
            answer={item.a} 
          />
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
