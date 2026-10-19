


// try 2 ------------
package com.tripnest.backend.controller;

import com.tripnest.backend.dto.RegistrationRequest;
import com.tripnest.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tripnest.backend.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegistrationRequest request) {

        return ResponseEntity.ok(
                authService.register(request)
        );
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    
}



// try 1  --------
// package com.tripnest.backend.controller;

// import com.tripnest.backend.dto.RegistrationRequest;
// import jakarta.validation.Valid;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @PostMapping("/register")
//     public ResponseEntity<String> register(
//             @Valid @RequestBody RegistrationRequest request) {

//         return ResponseEntity.ok(
//                 "Registration request received for: " + request.getEmail()
//         );
//     }
// }