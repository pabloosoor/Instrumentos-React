// c:\Users\Lautaro\Documents\GitHub\Instrumentos-back-UTN-Lab4\src\main\java\com\example\instrumentos\controller\InstrumentoController.java
package intrumentos.utn.controller;

import intrumentos.utn.model.Instrumento;
import intrumentos.utn.service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin(origins = "http://localhost:5173")
public class InstrumentoController {
    @Autowired
    private InstrumentoService service;

    @GetMapping
    public List<Instrumento> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instrumento> getById(@PathVariable Long id) {
        Instrumento instrumento = service.findById(id);
        if (instrumento == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(instrumento);
    }

    @PostMapping
    public ResponseEntity<Instrumento> create(@RequestBody Instrumento instrumento) {
        Instrumento saved = service.save(instrumento);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> update(@PathVariable Long id, @RequestBody Instrumento instrumento) {
        instrumento.setId(id);
        Instrumento updated = service.save(instrumento);
        return ResponseEntity.ok(updated);
    }

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