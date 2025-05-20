package intrumentos.utn.service;

import intrumentos.utn.dto.PedidosPorInstrumentoDTO;
import intrumentos.utn.dto.PedidosPorMesDTO;
import intrumentos.utn.model.Instrumento;
import intrumentos.utn.model.Pedido;
import intrumentos.utn.model.PedidoDetalle;
import intrumentos.utn.repository.InstrumentoRepository;
import intrumentos.utn.repository.PedidoDetalleRepository;
import intrumentos.utn.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    public Pedido savePedido(Pedido pedido) {
        pedido.setFechaPedido(new Date());
        double total = 0;
        for (PedidoDetalle detalle : pedido.getDetalles()) {
            Instrumento instrumento = instrumentoRepository.findById(detalle.getInstrumento().getId()).orElseThrow();
            detalle.setInstrumento(instrumento);
            total += instrumento.getPrecio() * detalle.getCantidad();
        }
        pedido.setTotalPedido(total);
        return pedidoRepository.save(pedido);
    }

    public List<PedidosPorMesDTO> contarPedidosPorMes() {
        return pedidoRepository.countPedidosByMesYAnio();
    }

    public List<PedidosPorInstrumentoDTO> contarPedidosPorInstrumento() {
        return pedidoDetalleRepository.countPedidosPorInstrumento();
    }

    // 🔎 Método de depuración para verificar si los pedidos tienen detalles
    public List<Pedido> obtenerPedidosConDetallesYLog(Date desde, Date hasta) {
        List<Pedido> pedidos = pedidoRepository.findPedidosConDetallesEInstrumentoEntreFechas(desde, hasta);

        System.out.println("📦 Pedidos encontrados: " + pedidos.size());
        for (Pedido p : pedidos) {
            System.out.println("📝 Pedido ID: " + p.getId() + ", Fecha: " + p.getFechaPedido());

            if (p.getDetalles() == null) {
                System.out.println("   ⚠️ Sin detalles.");
            } else if (p.getDetalles().isEmpty()) {
                System.out.println("   ⚠️ Detalles vacíos.");
            } else {
                System.out.println("   ✅ Detalles: " + p.getDetalles().size());
                for (PedidoDetalle detalle : p.getDetalles()) {
                    String instrumentoNombre = detalle.getInstrumento() != null ? detalle.getInstrumento().getInstrumento() : "Instrumento NULO";
                    System.out.println("      🎸 Instrumento: " + instrumentoNombre + " - Cantidad: " + detalle.getCantidad());
                }
            }
        }

        return pedidos;
    }
}
