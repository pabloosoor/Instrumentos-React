package intrumentos.utn.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import intrumentos.utn.model.Instrumento;
import intrumentos.utn.model.Pedido;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class MercadoPagoService {

    @Value("${mercado.pago.token}")
    private String mercadoPagoToken;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(mercadoPagoToken);
    }

    public Preference crearPreferenciaMP(Pedido pedido) throws MPException, MPApiException {
        PreferenceClient client = new PreferenceClient();

        List<PreferenceItemRequest> items = new ArrayList<>();

        pedido.getDetalles().forEach(detalle -> {
            Instrumento instrumento = detalle.getInstrumento();

            PreferenceItemRequest item = PreferenceItemRequest.builder()
                    .title(instrumento.getInstrumento())
                    .quantity(detalle.getCantidad())
                    .unitPrice(BigDecimal.valueOf(instrumento.getPrecio()))
                    .build();

            items.add(item);
        });

        PreferenceRequest request = PreferenceRequest.builder()
                .items(items)
                .externalReference(pedido.getId().toString())
                .build();

        return client.create(request);
    }
}