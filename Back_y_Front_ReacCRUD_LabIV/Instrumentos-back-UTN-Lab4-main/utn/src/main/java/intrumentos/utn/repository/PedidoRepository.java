package intrumentos.utn.repository;

import intrumentos.utn.dto.PedidosPorMesDTO;
import intrumentos.utn.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT new intrumentos.utn.dto.PedidosPorMesDTO(YEAR(p.fechaPedido), MONTH(p.fechaPedido), COUNT(p)) " +
            "FROM Pedido p GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido) ORDER BY YEAR(p.fechaPedido), MONTH(p.fechaPedido)")
    List<PedidosPorMesDTO> countPedidosByMesYAnio();

    @Query("SELECT DISTINCT p FROM Pedido p " +
            "LEFT JOIN FETCH p.detalles d " +
            "LEFT JOIN FETCH d.instrumento " +
            "WHERE p.fechaPedido BETWEEN :desde AND :hasta")
    List<Pedido> findPedidosConDetallesEInstrumentoEntreFechas(@Param("desde") Date desde, @Param("hasta") Date hasta);

    List<Pedido> findByFechaPedidoBetween(Date desde, Date hasta);
}
