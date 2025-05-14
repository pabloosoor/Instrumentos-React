package intrumentos.utn.controller;

import jakarta.servlet.http.HttpServletRequest;
import intrumentos.utn.dto.LoginRequestDto;
import intrumentos.utn.model.Usuario;
import intrumentos.utn.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    @Autowired
    private AuthService authService;

// ...

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest, HttpServletRequest request) {
        try {
            // Autentica usando el AuthenticationManager de Spring
            UsernamePasswordAuthenticationToken authReq =
                    new UsernamePasswordAuthenticationToken(loginRequest.getNombreUsuario(), loginRequest.getClave());
            var auth = authenticationManager.authenticate(authReq);
            SecurityContextHolder.getContext().setAuthentication(auth);

            // Forzar la creación de la sesión
            request.getSession(true);

            // Recupera el usuario como antes
            Usuario usuario = authService.login(loginRequest);

            return ResponseEntity.ok(Map.of(
                    "id", usuario.getId(),
                    "nombreUsuario", usuario.getNombreUsuario(),
                    "rol", usuario.getRol()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        }
    }
}