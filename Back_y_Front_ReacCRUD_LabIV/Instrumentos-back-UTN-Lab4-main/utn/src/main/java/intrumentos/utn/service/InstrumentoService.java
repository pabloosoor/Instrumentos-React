// c:\Users\Lautaro\Documents\GitHub\Instrumentos-back-UTN-Lab4\src\main\java\com\example\instrumentos\service\InstrumentoService.java
package intrumentos.utn.service;

import intrumentos.utn.model.Instrumento;
import intrumentos.utn.repository.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoService {
    @Autowired
    private InstrumentoRepository repository;

    public List<Instrumento> findAll() {
        return repository.findAll();
    }

    public Instrumento findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Instrumento save(Instrumento instrumento) {
        return repository.save(instrumento);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}