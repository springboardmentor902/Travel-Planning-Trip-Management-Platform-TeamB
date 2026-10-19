package com.tripnest.config;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import com.tripnest.entity.User;
import com.tripnest.service.UserService;

@Configuration
public class SecurityConfig {

    private final UserService userService;

    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // OAuth2 endpoints must be accessible
                .requestMatchers(
                    "/oauth2/**",
                    "/login/**"
                ).permitAll()

                // Public authentication endpoints
                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()

                // ADMIN-only APIs
                .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")

                // USER and ADMIN can access other protected APIs
                .requestMatchers("/api/**")
                .authenticated()

                // Everything else
                .anyRequest()
                .permitAll()
            )

            // Google OAuth2 Login
            .oauth2Login(oauth -> oauth

                .successHandler((request, response, authentication) -> {

                    OAuth2User googleUser =
                            (OAuth2User) authentication.getPrincipal();

                    String name =
                            googleUser.getAttribute("name");

                    String email =
                            googleUser.getAttribute("email");

                    // Find existing user or create a new USER
                    User user =
                            userService.saveOrUpdateUser(name, email);

                    // Get role from database
                    String role = user.getRole();

                    System.out.println(
                        "========== GOOGLE OAUTH USER =========="
                    );

                    System.out.println(
                        "Name: " + user.getFullName()
                    );

                    System.out.println(
                        "Email: " + user.getEmail()
                    );

                    System.out.println(
                        "Role: " + role
                    );

                    System.out.println(
                        "======================================="
                    );

                    // Send user information to React
                    String redirectUrl =
                            "http://localhost:5173/callback"
                            + "?name="
                            + URLEncoder.encode(
                                user.getFullName(),
                                StandardCharsets.UTF_8
                            )
                            + "&email="
                            + URLEncoder.encode(
                                user.getEmail(),
                                StandardCharsets.UTF_8
                            )
                            + "&role="
                            + URLEncoder.encode(
                                role,
                                StandardCharsets.UTF_8
                            );

                    response.sendRedirect(redirectUrl);
                })
            )

            // JWT / Bearer Token authentication
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(
                        jwtAuthenticationConverter()
                    )
                )
            );

        return http.build();
    }

    /**
     * Converts the "role" claim from the JWT into
     * Spring Security authorities.
     *
     * Example:
     * JWT role = ADMIN
     *        ↓
     * ROLE_ADMIN
     *
     * Therefore hasRole("ADMIN") works.
     */
    @Bean
    public Converter<Jwt, ? extends AbstractAuthenticationToken>
            jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter authoritiesConverter =
                new JwtGrantedAuthoritiesConverter();

        authoritiesConverter.setAuthoritiesClaimName("role");
        authoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(
                authoritiesConverter
        );

        return converter;
    }
    @Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
}