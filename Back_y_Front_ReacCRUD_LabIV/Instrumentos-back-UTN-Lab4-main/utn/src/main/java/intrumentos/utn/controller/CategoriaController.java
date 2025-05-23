package intrumentos.utn.controller;

import intrumentos.utn.model.Categoria;
import intrumentos.utn.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;


import java.util.List;

@RestController
@RequestMapping("/api/categoria")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {
    @Autowired
    private CategoriaService service;

    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    @GetMapping
    public List<Categoria> getAll() {
        return service.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getById(@PathVariable Long id) {
        Categoria categoria = service.findById(id);
        if (categoria == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categoria);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Categoria> create(@RequestBody Categoria categoria) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Usuario autenticado: " + auth.getName() + ", roles: " + auth.getAuthorities());
        Categoria saved = service.save(categoria);
        return ResponseEntity.ok(saved);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> update(@PathVariable Long id, @RequestBody Categoria categoria) {
        categoria.setId(id);
        Categoria updated = service.save(categoria);
        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Categoria categoria = service.findById(id);
        if (categoria == null) {
            return ResponseEntity.notFound().build();
        }
        try {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            // Esto ocurre si hay instrumentos asociados a la categoría
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}