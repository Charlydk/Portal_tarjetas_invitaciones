import React from 'react';
import Slider from 'react-slick';
import './HeroCarousel.css';

// Importación de imágenes desde src/assets para que Vite las procese (hashing, optimización)
import img1 from '../assets/carousel/carrusel-1.png';
import img2 from '../assets/carousel/carrusel-2.png';
import img3 from '../assets/carousel/carrusel-3.png';
import img4 from '../assets/carousel/carrusel-4.png';

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

  const images = [img1, img2, img3, img4];

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
