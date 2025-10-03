import React from 'react';
import Slider from 'react-slick';
import './HeroCarousel.css';

function HeroCarousel() {
  // Configuración del carrusel
  const settings = {
    dots: true,         // Muestra los puntos de navegación
    infinite: true,     // Bucle infinito
    fade: true,         // Efecto de desvanecimiento entre imágenes
    speed: 500,         // Velocidad de la transición en ms
    slidesToShow: 1,    // Muestra una imagen a la vez
    slidesToScroll: 1,  // Pasa una imagen a la vez
    autoplay: true,     // Se reproduce automáticamente
    autoplaySpeed: 3000, // Cambia de imagen cada 3 segundos
    arrows: false,      // Oculta las flechas de navegación
  };

  const images = [
    '/assets/carrusel-1.png',
    '/assets/carrusel-2.png',
    '/assets/carrusel-3.png',
    '/assets/carrusel-4.png',
  ];

  return (
    <div className="hero-carousel">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Carousel image ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroCarousel;