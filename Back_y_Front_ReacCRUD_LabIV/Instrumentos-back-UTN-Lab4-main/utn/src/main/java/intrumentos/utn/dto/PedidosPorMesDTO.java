package intrumentos.utn.dto;

public class PedidosPorMesDTO {
    private int anio;
    private int mes;
    private long cantidad;

    public PedidosPorMesDTO(int anio, int mes, long cantidad) {
        this.anio = anio;
        this.mes = mes;
        this.cantidad = cantidad;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public int getMes() {
        return mes;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public long getCantidad() {
        return cantidad;
    }

    public void setCantidad(long cantidad) {
        this.cantidad = cantidad;
    }
}
