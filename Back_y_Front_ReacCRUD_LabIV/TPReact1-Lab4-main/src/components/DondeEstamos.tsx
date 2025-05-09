

function DondeEstamos() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Donde Estamos</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.788898452262!2d-68.839898!3d-32.889899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e093b2f5c3b7f%3A0x7b5e0f0f0f0f0f0f!2sAv.%20Las%20Heras%20y%20Av.%20San%20Martin%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1690000000000!5m2!1ses!2sar"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa"
      ></iframe>
    </div>
  );
}

export default DondeEstamos;