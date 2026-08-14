package backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {

        return ResponseEntity.ok(
                new AuthResponse(
                        true,
                        authentication.getName()
                )
        );
    }

    public record AuthResponse(
            boolean authenticated,
            String loginId
    ) {
    }
}