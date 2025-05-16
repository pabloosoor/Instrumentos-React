package intrumentos.utn.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import intrumentos.utn.model.Instrumento;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public ByteArrayInputStream exportarInstrumentoPDF(Instrumento instrumento) throws Exception {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);

        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Font labelFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        Font textFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        // Título
        Paragraph title = new Paragraph(instrumento.getInstrumento(), titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph(" ")); // espacio

        // Imagen del instrumento (desde resources/static/img)
        try {
            var imgPath = new ClassPathResource("static/img/" + instrumento.getImagen());
            Image img = Image.getInstance(imgPath.getURL());
            img.scaleToFit(300, 200);
            img.setAlignment(Element.ALIGN_CENTER);
            document.add(img);
            document.add(new Paragraph(" "));
        } catch (Exception e) {
            document.add(new Paragraph("⚠️ Imagen no disponible."));
        }

        // Precio
        document.add(new Paragraph("Precio: $" + instrumento.getPrecio(), labelFont));

        // Costo de envío
        String envio = instrumento.getCostoEnvio().equalsIgnoreCase("G")
                ? "Envío gratis a todo el país"
                : "Costo de envío: $" + instrumento.getCostoEnvio();
        document.add(new Paragraph(envio, textFont));

        // Vendidos
        document.add(new Paragraph("Vendidos: " + instrumento.getCantidadVendida(), textFont));

        // Marca y modelo
        document.add(new Paragraph("Marca: " + instrumento.getMarca(), textFont));
        document.add(new Paragraph("Modelo: " + instrumento.getModelo(), textFont));

        // Descripción
        document.add(new Paragraph("Descripción:", labelFont));
        document.add(new Paragraph(instrumento.getDescripcion(), textFont));

        document.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
}
