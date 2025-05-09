
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
      <div className="bg-cover bg-center h-64 mb-4" style={{ backgroundImage: `url('/img/banner.jpeg')` }}>
        <div className="flex items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold">Musical Hendrix</h1>
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
            <img src="/img/nro1.jpg" alt="Instrumento 1" className="w-full h-64 object-cover" />
          </div>
          <div>
            <img src="/img/nro2.jpg" alt="Instrumento 2" className="w-full h-64 object-cover" />
          </div>
          <div>
            <img src="/img/nro3.jpg" alt="Instrumento 3" className="w-full h-64 object-cover" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Home;