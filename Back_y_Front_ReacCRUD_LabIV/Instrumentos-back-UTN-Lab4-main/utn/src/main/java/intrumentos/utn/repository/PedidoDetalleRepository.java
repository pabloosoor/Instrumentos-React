package intrumentos.utn.repository;

import intrumentos.utn.dto.PedidosPorInstrumentoDTO;
import intrumentos.utn.model.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

    @Query("SELECT new intrumentos.utn.dto.PedidosPorInstrumentoDTO(pd.instrumento.instrumento, COUNT(pd)) " +
            "FROM PedidoDetalle pd GROUP BY pd.instrumento.instrumento")
    List<PedidosPorInstrumentoDTO> countPedidosPorInstrumento();
}
