
package com.tripnest.backend.security;

import com.tripnest.backend.service.JwtService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;

    public OAuth2LoginSuccessHandler(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oauthUser =
                (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");

        System.out.println("Google OAuth2 Login Successful!");
        System.out.println("Google User: " + email);

        String token = jwtService.generateToken(email);

        response.sendRedirect(
                "http://localhost:5173/dashboard?token=" + token
        );
    }
}



/// wrkng-------
// package com.tripnest.backend.security;

// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
// import org.springframework.stereotype.Component;

// import java.io.IOException;

// @Component
// public class OAuth2LoginSuccessHandler
//         extends SimpleUrlAuthenticationSuccessHandler {

//     @Override
//     public void onAuthenticationSuccess(
//             HttpServletRequest request,
//             HttpServletResponse response,
//             Authentication authentication)
//             throws IOException, ServletException {

//         System.out.println("Google OAuth2 Login Successful!");
//         System.out.println("Google User: " + authentication.getName());

//         response.sendRedirect("http://localhost:5173/");
//     }
// }


















// -------------
// package com.tripnest.backend.security;

// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
// import org.springframework.stereotype.Component;

// import com.tripnest.backend.service.AuthService;
// import com.tripnest.backend.service.JwtService;

// import java.io.IOException;

// import com.tripnest.backend.repository.UserRepository;
// import com.tripnest.backend.entity.User;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import java.util.UUID;
// import org.springframework.context.annotation.Lazy;

// @Component
// public class OAuth2LoginSuccessHandler
//         extends SimpleUrlAuthenticationSuccessHandler {

//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     private final JwtService jwtService;
//     private final AuthService authService;

//     public OAuth2LoginSuccessHandler(
//             JwtService jwtService,
//             UserRepository userRepository,
//             PasswordEncoder passwordEncoder,
//             @Lazy AuthService authService) {

//         this.jwtService = jwtService;
//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//         this.authService = authService;
//     }


//     @Override
//     public void onAuthenticationSuccess(
//             HttpServletRequest request,
//             HttpServletResponse response,
//             Authentication authentication)
//             throws IOException, ServletException {

//         //String email = authentication.getName();
//         String email = authentication.getName();

//         User user = userRepository.findByEmail(email)
//                 .orElseGet(() -> {

//                     User newUser = User.builder()
//                             .name(authentication.getName())
//                             .email(email)
//                             .password(passwordEncoder.encode(UUID.randomUUID().toString()))
//                             .build();

//                     return userRepository.save(newUser);
//         });

//         String token = authService.loginWithGoogle(email, email);
//         //String token = jwtService.generateToken(user.getEmail());

//         //String token = jwtService.generateToken(email);

//         System.out.println("Google OAuth2 Login Successful!");
//         System.out.println("Google User: " + email);
//         System.out.println("TripNest JWT generated!");

//         response.sendRedirect(
//                 "http://localhost:5173/?token=" + token
//         );
//     }
//     // public void onAuthenticationSuccess(
//     //         HttpServletRequest request,
//     //         HttpServletResponse response,
//     //         Authentication authentication)
//     //         throws IOException, ServletException {

//     //     System.out.println("Google OAuth2 Login Successful!");
//     //     System.out.println("User: " + authentication.getName());

//     //     response.sendRedirect("http://localhost:5173/");
//     // }
// }