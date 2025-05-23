package intrumentos.utn;

import intrumentos.utn.model.Usuario;
import intrumentos.utn.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class UtnApplication {

	public static void main(String[] args) {
		SpringApplication.run(UtnApplication.class, args);
	}

	//Creacion de 3 usuarios preestablecidos
	@Bean
	public CommandLineRunner initUsuarios(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			crearUsuarioSiNoExiste(usuarioRepository, passwordEncoder, "admin1", "admin123", "ADMIN");
			crearUsuarioSiNoExiste(usuarioRepository, passwordEncoder, "operador1", "operador123", "OPERADOR");
			crearUsuarioSiNoExiste(usuarioRepository, passwordEncoder, "usuario1", "usuario123", "VISOR");
		};
	}

	private void crearUsuarioSiNoExiste(UsuarioRepository repo, PasswordEncoder encoder, String nombre, String clave, String rol) {
		if (repo.findByNombreUsuario(nombre).isEmpty()) {
			Usuario usuario = new Usuario();
			usuario.setNombreUsuario(nombre);
			usuario.setClave(encoder.encode(clave));
			usuario.setRol(rol);
			repo.save(usuario);
			System.out.println("✅ Usuario creado: " + nombre + " con rol " + rol);
		} else {
			System.out.println("ℹ️ Usuario '" + nombre + "' ya existe.");
		}
	}
}
