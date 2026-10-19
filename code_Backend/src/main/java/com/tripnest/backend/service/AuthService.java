// try 2 **** 
package com.tripnest.backend.service;

import com.tripnest.backend.dto.LoginRequest;
import com.tripnest.backend.dto.RegistrationRequest;
import com.tripnest.backend.repository.RoleRepository;
import com.tripnest.backend.repository.UserRepository;
import com.tripnest.backend.repository.UserRoleRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.tripnest.backend.entity.User;
import com.tripnest.backend.entity.UserRole;
import com.tripnest.backend.exception.InvalidCredentialsException;
import com.tripnest.backend.entity.Role;
import org.springframework.transaction.annotation.Transactional;

import com.tripnest.backend.service.JwtService;
import java.util.UUID;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                    PasswordEncoder passwordEncoder,
                    RoleRepository roleRepository,
                    UserRoleRepository userRoleRepository,
                    JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.jwtService = jwtService;
    }


    public String register(RegistrationRequest request) {

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        userRepository.save(user);
        Role travelerRole = roleRepository.findByName("TRAVELER")
            .orElseThrow(() -> new RuntimeException("TRAVELER role not found"));

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(travelerRole);
        userRoleRepository.save(userRole);

        //return "Email is available for registration";
        return "User registered successfully !";
        //return "User registered successfully + Pw:"+request.getPassword()+ ", Hashed password: "+ hashedPassword;
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        //return "Login successful! "; // + "Token- "+ jwtService.generateToken(user.getEmail());
       return jwtService.generateToken(user.getEmail());
       
    }

    public String loginWithGoogle(String email, String name) {

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {

                    User newUser = new User();
                    newUser.setName(name);
                    newUser.setEmail(email);

                    // Google users don't use a TripNest password.
                    // We still need a value because password is NOT NULL.
                    newUser.setPassword(
                            passwordEncoder.encode(UUID.randomUUID().toString())
                    );

                    userRepository.save(newUser);

                    Role travelerRole = roleRepository.findByName("TRAVELER")
                            .orElseThrow(() ->
                                    new RuntimeException("TRAVELER role not found"));

                    UserRole userRole = new UserRole();
                    userRole.setUser(newUser);
                    userRole.setRole(travelerRole);

                    userRoleRepository.save(userRole);

                    return newUser;
                });

        return jwtService.generateToken(user.getEmail());
    }

}





// try 1 -------
// package com.tripnest.backend.service;

// import com.tripnest.backend.dto.RegistrationRequest;
// import org.springframework.stereotype.Service;

// @Service
// public class AuthService {

//     public String register(RegistrationRequest request) {

//         return "Registration request received for: " + request.getEmail();
//     }
// }