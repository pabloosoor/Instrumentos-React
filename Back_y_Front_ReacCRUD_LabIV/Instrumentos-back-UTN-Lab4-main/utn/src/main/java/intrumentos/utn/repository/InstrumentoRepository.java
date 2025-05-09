// c:\Users\Lautaro\Documents\GitHub\Instrumentos-back-UTN-Lab4\src\main\java\com\example\instrumentos\repository\InstrumentoRepository.java
package intrumentos.utn.repository;

import intrumentos.utn.model.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {
}