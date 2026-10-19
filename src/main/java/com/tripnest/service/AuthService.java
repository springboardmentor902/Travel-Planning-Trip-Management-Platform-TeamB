package com.tripnest.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tripnest.entity.User;
import com.tripnest.repository.UserRepository;
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(String name, String email, String password) {

    if (userRepository.findByEmail(email).isPresent()) {
        return "Email already registered";
    }

    User user = new User();

    user.setFullName(name);
    user.setEmail(email);

    // Encrypt password
    user.setPassword(passwordEncoder.encode(password));

    // New registered users are USER by default
    user.setRole("USER");

    userRepository.save(user);

    return "User registered successfully!";
}

    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (user.getPassword() == null ||
            !passwordEncoder.matches(password, user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        return jwtService.generateToken(
        user.getEmail(),
        user.getRole()
);
    }  
}