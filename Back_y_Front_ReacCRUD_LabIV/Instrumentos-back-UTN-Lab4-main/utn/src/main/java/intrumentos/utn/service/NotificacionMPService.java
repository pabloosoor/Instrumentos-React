package intrumentos.utn.service;


import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import intrumentos.utn.model.Pedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class NotificacionMPService {

    @Autowired
    private PedidoService pedidoService;

    /**
     * Procesa una notificación de pago de Mercado Pago
     */
    @Transactional
    public void procesarNotificacionPago(String paymentId) throws MPException, MPApiException {
        // Obtener el pago desde Mercado Pago
        PaymentClient client = new PaymentClient();
        Payment payment = client.get(Long.parseLong(paymentId));

        // Si el pago es aprobado, actualizar el estado del pedido
        if ("approved".equals(payment.getStatus())) {
            // Obtener el pedido asociado a este pago
            // Esto depende de cómo hayas implementado la asociación entre pedidos y pagos
            // Una opción común es usar el external_reference
            String pedidoId = payment.getExternalReference();

           /* if (pedidoId != null) {
                Optional<Pedido> pedidoOpt = pedidoService.findPedidoById(Long.parseLong(pedidoId));

                if (pedidoOpt.isPresent()) {
                    Pedido pedido = pedidoOpt.get();
                    pedido.setEstado("PAGADO");
                    pedidoService.savePedido(pedido);
                }

            */
            }
        }
    }

