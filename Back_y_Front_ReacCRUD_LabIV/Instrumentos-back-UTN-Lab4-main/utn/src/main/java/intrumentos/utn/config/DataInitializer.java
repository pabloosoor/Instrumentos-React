package intrumentos.utn.config;

import intrumentos.utn.model.Categoria;
import intrumentos.utn.model.Instrumento;
import intrumentos.utn.repository.CategoriaRepository;
import intrumentos.utn.repository.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DataInitializer {

    @Bean
    @Transactional
    CommandLineRunner initDatabase(CategoriaRepository categoriaRepository,
            InstrumentoRepository instrumentoRepository) {
        return args -> {
            // Verificar si ya hay datos para evitar duplicados
            if (categoriaRepository.count() > 0 || instrumentoRepository.count() > 0) {
                System.out.println("La base de datos ya tiene datos. Saltando la inicialización.");
                return;
            }

            System.out.println("Inicializando la base de datos con datos de muestra...");

            // Crear y guardar categorías sin ID
            Categoria cuerdas = new Categoria("Cuerda");
            Categoria viento = new Categoria("Viento");
            Categoria percusion = new Categoria("Percusión");
            Categoria teclado = new Categoria("Teclado");
            Categoria electronico = new Categoria("Electrónico");

            categoriaRepository.saveAll(Arrays.asList(
                    cuerdas, viento, percusion, teclado, electronico));

            // Crear un mapa para facilitar la búsqueda de categorías por ID
            Map<Long, Categoria> categoriasMap = new HashMap<>();
            categoriasMap.put(1L, cuerdas);
            categoriasMap.put(2L, viento);
            categoriasMap.put(3L, percusion);
            categoriasMap.put(4L, teclado);
            categoriasMap.put(5L, electronico);

            // Crear y guardar instrumentos
            instrumentoRepository.saveAll(Arrays.asList(
                    new Instrumento("Mandolina Instrumento Musical Stagg Sunburst", "Stagg", "M20", "nro10.jpg",
                            2450.00, "G", 28,
                            "Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.",
                            categoriasMap.get(1L)),
                    new Instrumento("Pandereta Pandero Instrumento Musical", "DyM ventas", "32 sonajas", "nro9.jpg",
                            325.00, "150", 10,
                            "1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !!",
                            categoriasMap.get(3L)),
                    new Instrumento("Triangulo Musical 24 cm Percusion", "LBP", "24", "nro8.jpg",
                            260.00, "250", 3,
                            "Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio",
                            categoriasMap.get(3L)),
                    new Instrumento("Bar Chimes Lp Cortina Musical 72 Barras", "FM", "LATIN", "nro7.jpg",
                            2250.00, "G", 2,
                            "BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B",
                            categoriasMap.get(3L)),
                    new Instrumento("Shekeres. Instrumento. Música. Artesanía.", "Azalea Artesanías",
                            "Cuentas de madera", "nro6.jpg",
                            850.00, "300", 5,
                            "Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original.",
                            categoriasMap.get(3L)),
                    new Instrumento( "Antiguo Piano Aleman Con Candelabros.", "Neumeyer", "Stratus", "nro3.jpg",
                            17000.00, "2000", 0,
                            "Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad.",
                            categoriasMap.get(4L)),
                    new Instrumento("Guitarra Ukelele Infantil Grande 60cm", "GUITARRA", "UKELELE", "nro4.jpg",
                            500.00, "G", 5,
                            "Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad",
                            categoriasMap.get(1L)),
                    new Instrumento("Teclado Organo Electronico Musical Instrumento 54 Teclas", "GADNIC", "T01",
                            "nro2.jpg",
                            2250.00, "G", 1375,
                            "Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm",
                            categoriasMap.get(4L)),
                    new Instrumento("Instrumentos De Percusión Niños Set Musical Con Estuche", "KNIGHT", "LB17",
                            "nro1.jpg",
                            2700.00, "300", 15,
                            "Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento.",
                            categoriasMap.get(3L)),
                    new Instrumento( "Batería Musical Infantil Juguete Niño 9 Piezas Palillos", "Bateria",
                            "Infantil", "nro5.jpg",
                            850.00, "250", 380,
                            "DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM",
                            categoriasMap.get(3L))));

            System.out.println("Inicialización de datos completada.");
        };
    }
}