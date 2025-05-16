package intrumentos.utn.service;

import intrumentos.utn.model.Pedido;
import intrumentos.utn.model.PedidoDetalle;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

@Service
public class ExcelService {

    public InputStream exportarPedidosAExcel(List<Pedido> pedidos) throws Exception {
        Workbook workbook = new XSSFWorkbook();
        Sheet hoja = workbook.createSheet("Pedidos");

        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        Row header = hoja.createRow(0);
        String[] columnas = {
                "Fecha", "Pedido", "Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal"
        };
        for (int i = 0; i < columnas.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(columnas[i]);
            cell.setCellStyle(headerStyle);
        }

        int rowIdx = 1;
        for (Pedido pedido : pedidos) {
            List<PedidoDetalle> detalles = pedido.getDetalles();
            if (detalles != null) {
                for (PedidoDetalle detalle : detalles) {
                    Row fila = hoja.createRow(rowIdx++);

                    fila.createCell(0).setCellValue(pedido.getFechaPedido().toString());
                    fila.createCell(1).setCellValue(pedido.getId());

                    if (detalle.getInstrumento() != null) {
                        fila.createCell(2).setCellValue(detalle.getInstrumento().getInstrumento());
                        fila.createCell(3).setCellValue(detalle.getInstrumento().getMarca());
                        fila.createCell(4).setCellValue(detalle.getInstrumento().getModelo());
                        fila.createCell(6).setCellValue(detalle.getInstrumento().getPrecio());
                    } else {
                        fila.createCell(2).setCellValue("N/A");
                        fila.createCell(3).setCellValue("N/A");
                        fila.createCell(4).setCellValue("N/A");
                        fila.createCell(6).setCellValue(0);
                    }

                    fila.createCell(5).setCellValue(detalle.getCantidad());
                    fila.createCell(7).setCellValue(detalle.getCantidad() * (detalle.getInstrumento() != null ? detalle.getInstrumento().getPrecio() : 0));
                }
            }
        }

        for (int i = 0; i < columnas.length; i++) {
            hoja.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
