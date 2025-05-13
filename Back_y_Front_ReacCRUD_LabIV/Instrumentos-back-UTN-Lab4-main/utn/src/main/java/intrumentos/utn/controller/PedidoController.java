package intrumentos.utn.controller;

import intrumentos.utn.model.Instrumento;
import intrumentos.utn.model.Pedido;
import intrumentos.utn.service.InstrumentoService;
import intrumentos.utn.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> guardarPedido(@RequestBody Pedido pedido) {
        Pedido saved = pedidoService.savePedido(pedido);
        return ResponseEntity.ok(saved);
    }

}

