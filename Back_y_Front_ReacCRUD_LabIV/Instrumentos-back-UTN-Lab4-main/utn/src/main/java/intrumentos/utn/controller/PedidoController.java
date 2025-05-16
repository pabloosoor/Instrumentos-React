package intrumentos.utn.controller;

import intrumentos.utn.dto.PedidosPorInstrumentoDTO;
import intrumentos.utn.dto.PedidosPorMesDTO;
import intrumentos.utn.model.Pedido;
import intrumentos.utn.service.ExcelService;
import intrumentos.utn.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080"})
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private ExcelService excelService;

    @PostMapping
    public ResponseEntity<Pedido> guardarPedido(@RequestBody Pedido pedido) {
        Pedido saved = pedidoService.savePedido(pedido);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/reportes/pedidos-por-mes")
    public ResponseEntity<List<PedidosPorMesDTO>> getPedidosPorMes() {
        return ResponseEntity.ok(pedidoService.contarPedidosPorMes());
    }

    @GetMapping("/reportes/pedidos-por-instrumento")
    public ResponseEntity<List<PedidosPorInstrumentoDTO>> getPedidosPorInstrumento() {
        return ResponseEntity.ok(pedidoService.contarPedidosPorInstrumento());
    }

    // 🔎 Endpoint que usa el método con logs para ver por consola si hay datos
    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarPedidosAExcel(
            @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date desde,
            @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date hasta) {
        try {
            List<Pedido> pedidos = pedidoService.obtenerPedidosConDetallesYLog(desde, hasta);
            InputStream excel = excelService.exportarPedidosAExcel(pedidos);
            byte[] bytes = excel.readAllBytes();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=pedidos.xlsx");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(bytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
