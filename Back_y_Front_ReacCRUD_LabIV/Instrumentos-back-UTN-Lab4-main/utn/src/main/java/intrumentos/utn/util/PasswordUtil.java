package intrumentos.utn.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Encriptar de la contraseña antes de guardarla en la base de datos
    public static String encriptar(String passwordPlano) {
        return encoder.encode(passwordPlano);
    }


    // Valido la contraseña que se quiere ingrese con la que esta guardada en la base de datos
    public static boolean validar(String passwordPlano, String passwordEncriptado) {
        return encoder.matches(passwordPlano, passwordEncriptado);
    }
}

