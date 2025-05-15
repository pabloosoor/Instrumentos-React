package intrumentos.utn.service;

import intrumentos.utn.model.Usuario;
import intrumentos.utn.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Usuario> validarUsuario(String nombreUsuario, String clavePlano) {
        Optional<Usuario> usuario = usuarioRepository.findByNombreUsuario(nombreUsuario);

        if (usuario.isPresent()) {
            boolean matches = passwordEncoder.matches(clavePlano, usuario.get().getClave());
            if (matches) {
                return usuario;
            }
        }
        return Optional.empty();
    }
}
