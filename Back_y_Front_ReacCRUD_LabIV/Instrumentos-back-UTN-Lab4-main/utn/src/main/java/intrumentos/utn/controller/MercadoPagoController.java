package intrumentos.utn.controller;


import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import intrumentos.utn.model.Pedido;
import intrumentos.utn.service.MercadoPagoService;
import intrumentos.utn.service.NotificacionMPService;
import intrumentos.utn.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mercadopago")
@CrossOrigin(origins = "http://localhost:5173")

public class MercadoPagoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private MercadoPagoService mercadoPagoService;

    @Autowired
    private NotificacionMPService notificacionMPService;

    @PostMapping("/crear-preferencia")
    public ResponseEntity<?> crearPreferencia(@RequestBody Pedido pedido) {
        try {
            // Guardar el pedido en la base de datos
            Pedido pedidoGuardado = pedidoService.savePedido(pedido);

            // Crear la preferencia en Mercado Pago
            Preference preference = mercadoPagoService.crearPreferenciaMP(pedidoGuardado);

            // Devolver los datos necesarios para el frontend
            Map<String, String> response = new HashMap<>();
            response.put("preferenceId", preference.getId());
            response.put("initPoint", preference.getInitPoint());

            return ResponseEntity.ok(response);
        } catch (MPException | MPApiException e) {
            return ResponseEntity.badRequest().body("Error al crear la preferencia: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error inesperado: " + e.getMessage());
        }
    }

    @PostMapping("/pagar")
    public ResponseEntity<?> generarPreferencia(@RequestBody Pedido pedido) {
        try {
            // Guarda el pedido con total y fecha
            Pedido pedidoGuardado = pedidoService.savePedido(pedido);

            // Genera la preferencia de Mercado Pago
            Preference preference = mercadoPagoService.crearPreferenciaMP(pedidoGuardado);

            // Devuelve la URL del checkout de Mercado Pago
            return ResponseEntity.ok(preference.getInitPoint());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al generar preferencia de pago: " + e.getMessage());
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> recibirNotificacion(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String data_id) {

        try {
            // Procesar la notificación según su tipo
            if ("payment".equals(type) && data_id != null) {
                notificacionMPService.procesarNotificacionPago(data_id);
            }

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al procesar notificación: " + e.getMessage());
        }
    }
}