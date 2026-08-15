import React, { useState } from 'react';
import styles from './PricingSection.module.css';
import { waLink, hasWhatsApp } from '../../lib/whatsapp';

function PricingSection({ pricingData }) {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (e, planName) => {
    e.preventDefault();
    setActiveModal(planName);
  };

  const closeModal = () => setActiveModal(null);

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
              {plan.price}
            </div>
            <ul className={styles.planFeatures}>
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex}>✓ {feature}</li>
              ))}
            </ul>
            <button onClick={(e) => openModal(e, plan.plan)} className="btn-primary" style={{ width: '100%', display: 'block', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              {plan.ctaText}
            </button>
          </div>
        ))}
      </div>

      {activeModal === 'Clásica' && (
        <div onClick={closeModal} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000, padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: '40px', borderRadius: '25px', maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative', animation: 'fadeIn 0.3s' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#e5e5e5'} onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}>✖</button>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '15px', fontFamily: 'var(--font-title)' }}>Cómo seguimos</h3>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '30px', lineHeight: '1.6', opacity: 0.9 }}>
              Mirá los diseños y quedate con el que más te guste. Después nos escribís
              por WhatsApp contándonos cómo es tu evento y <strong>nosotros armamos tu invitación</strong>.
            </p>
            <a href="#templates" onClick={closeModal} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '15px 35px' }}>
              Ver los diseños
            </a>
          </div>
        </div>
      )}

      {activeModal === 'Premium' && (
        <div onClick={closeModal} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000, padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: '40px', borderRadius: '25px', maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative', animation: 'fadeIn 0.3s' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#e5e5e5'} onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}>✖</button>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '15px', fontFamily: 'var(--font-title)' }}>Hablemos de tu evento</h3>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '30px', lineHeight: '1.6', opacity: 0.9 }}>
              Contanos qué temática tenés en mente y armamos algo único para vos.
              Si todavía no sabés por dónde empezar, mirá primero los diseños y
              después charlamos.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {hasWhatsApp && (
                <a
                  href={waLink('¡Hola! Me interesa una invitación Premium. ¿Me contás cómo es?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '15px 35px' }}
                >
                  💬 Escribinos por WhatsApp
                </a>
              )}
              <a href="#templates" onClick={closeModal} style={{ textDecoration: 'none', display: 'block', padding: '15px 35px', borderRadius: '50px', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white';}} onMouseLeave={e => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-primary)';}}>
                Ver los diseños primero
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PricingSection;
