import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Optional style for arrows
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-4">
      {/* Banner */}
      <div 
        className="bg-cover bg-center h-80 md:h-96 mb-8 rounded-lg shadow-xl relative overflow-hidden"
        style={{ backgroundImage: `url('/img/banner.jpeg')` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="backdrop-blur-md bg-gradient-to-r from-violet-700/60 via-indigo-400/50 to-cyan-300/60 rounded-xl px-8 py-4 shadow-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg">
              Musical Hendrix
            </h1>
          </div>
        </div>
      </div>

      {/* Descripción de la tienda */}
      <div className="mb-4">
        <p className="text-lg text-gray-700">
          Musical Hendrix es una tienda de instrumentos musicales con más de 15 años de experiencia. Tenemos el conocimiento y la capacidad para informarte acerca de las mejores elecciones para tu compra musical.
        </p>
      </div>

      {/* Carrusel de imágenes */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Explora nuestros instrumentos:</h2>
        <Slider {...settings}>
          <div>
            <img src="/img/carrusel1.png" alt="Instrumento 1" className="w-full h-64 object-cover" />
          </div>
          <div>
            <img src="/img/carrusel2.png" alt="Instrumento 2" className="w-full h-64 object-cover" />
          </div>
          <div>
            <img src="/img/carrusel3.png" alt="Instrumento 3" className="w-full h-64 object-cover" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Home;