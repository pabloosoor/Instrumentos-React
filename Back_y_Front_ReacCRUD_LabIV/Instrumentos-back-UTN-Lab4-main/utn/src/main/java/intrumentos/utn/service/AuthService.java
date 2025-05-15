package intrumentos.utn.service;

import intrumentos.utn.dto.LoginRequestDto;
import intrumentos.utn.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioService usuarioService;

    public Usuario login(LoginRequestDto loginRequest) throws Exception {
        return usuarioService
                .validarUsuario(loginRequest.getNombreUsuario(), loginRequest.getClave())
                .orElseThrow(() -> new Exception("Usuario o contraseña incorrectos"));
    }
}