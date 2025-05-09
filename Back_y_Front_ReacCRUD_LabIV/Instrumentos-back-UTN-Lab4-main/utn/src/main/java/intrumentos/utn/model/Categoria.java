package intrumentos.utn.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // Constructor vacío (requerido por JPA)
    public Categoria() {
    }

    public Categoria(String nombre) {
        this.nombre = nombre;
    }


    // Constructor con parámetros
    public Categoria(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // toString (opcional, útil para debugging)
    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
