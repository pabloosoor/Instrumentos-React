package intrumentos.utn.controller;

import intrumentos.utn.model.Instrumento;
import intrumentos.utn.service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin(origins = "http://localhost:5173")
public class InstrumentoController {
    @Autowired
    private InstrumentoService service;

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
}