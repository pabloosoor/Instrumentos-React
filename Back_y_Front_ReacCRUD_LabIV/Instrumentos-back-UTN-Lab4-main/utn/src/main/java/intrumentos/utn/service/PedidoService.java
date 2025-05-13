package intrumentos.utn.service;
import intrumentos.utn.model.Instrumento;
import intrumentos.utn.model.Pedido;
import intrumentos.utn.model.PedidoDetalle;
import intrumentos.utn.repository.InstrumentoRepository;
import intrumentos.utn.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PedidoService {

    @Autowired
    private InstrumentoRepository instrumentoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido savePedido(Pedido pedido) {
        pedido.setFechaPedido(new Date());
        double total = 0;
        for (PedidoDetalle detalle : pedido.getDetalles()) {
            // Buscar el instrumento real por id
            Instrumento instrumento = instrumentoRepository.findById(detalle.getInstrumento().getId()).orElseThrow();
            detalle.setInstrumento(instrumento);
            total += instrumento.getPrecio() * detalle.getCantidad();
        }
        pedido.setTotalPedido(total);
        return pedidoRepository.save(pedido);
    }
}
