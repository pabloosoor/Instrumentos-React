package intrumentos.utn.service;
import intrumentos.utn.model.Instrumento;
import intrumentos.utn.model.Pedido;
import intrumentos.utn.repository.InstrumentoRepository;
import intrumentos.utn.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido savePedido(Pedido pedido) {
        pedido.setFechaPedido(new Date());
        double total = pedido.getDetalles().stream()
                .mapToDouble(d -> d.getInstrumento().getPrecio() * d.getCantidad())
                .sum();
        pedido.setTotalPedido(total);
        return pedidoRepository.save(pedido);
    }
}
