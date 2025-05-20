package intrumentos.utn.dto;

public class PedidosPorInstrumentoDTO {
    private String instrumento;
    private long cantidad;

    public PedidosPorInstrumentoDTO(String instrumento, long cantidad) {
        this.instrumento = instrumento;
        this.cantidad = cantidad;
    }

    public String getInstrumento() {
        return instrumento;
    }

    public void setInstrumento(String instrumento) {
        this.instrumento = instrumento;
    }

    public long getCantidad() {
        return cantidad;
    }

    public void setCantidad(long cantidad) {
        this.cantidad = cantidad;
    }
}
