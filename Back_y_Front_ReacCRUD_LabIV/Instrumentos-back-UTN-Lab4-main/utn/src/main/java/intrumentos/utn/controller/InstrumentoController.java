package intrumentos.utn.controller;

import intrumentos.utn.model.Instrumento;
import intrumentos.utn.service.InstrumentoService;
import intrumentos.utn.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin(origins = "http://localhost:5173")
public class InstrumentoController {

    @Autowired
    private InstrumentoService service;

    @Autowired
    private PdfService pdfService; // ✅ Nuevo servicio

    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    @GetMapping
    public List<Instrumento> getAll() {
        return service.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    @GetMapping("/{id}")
    public ResponseEntity<Instrumento> getById(@PathVariable Long id) {
        Instrumento instrumento = service.findById(id);
        if (instrumento == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(instrumento);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Instrumento> create(@RequestBody Instrumento instrumento) {
        Instrumento saved = service.save(instrumento);
        return ResponseEntity.ok(saved);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> update(@PathVariable Long id, @RequestBody Instrumento instrumento) {
        instrumento.setId(id);
        Instrumento updated = service.save(instrumento);
        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Instrumento instrumento = service.findById(id);
        if (instrumento == null) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Exportar Instrumento a PDF
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    @GetMapping("/pdf/{id}")
    public ResponseEntity<byte[]> exportarInstrumentoPDF(@PathVariable Long id) {
        try {
            Instrumento instrumento = service.findById(id);
            if (instrumento == null) {
                return ResponseEntity.notFound().build();
            }

            ByteArrayInputStream pdfStream = pdfService.exportarInstrumentoPDF(instrumento);
            byte[] bytes = pdfStream.readAllBytes();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline; filename=instrumento_" + id + ".pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(bytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}