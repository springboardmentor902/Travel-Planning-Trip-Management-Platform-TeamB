package com.tripnest.controller;

import com.tripnest.dto.LoginRequest;
import com.tripnest.dto.RegistrationRequest;
import com.tripnest.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
                authService.register(
                        request.getName(),
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }
}