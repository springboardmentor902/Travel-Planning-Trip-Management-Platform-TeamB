package com.tripnest;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/oauth2/**",
                    "/login/**"
                ).permitAll()
                .anyRequest().authenticated()
            )

            .oauth2Login(oauth -> oauth

                .successHandler((request, response, authentication) -> {

                    // Get Google user information
                    OAuth2User user =
                            (OAuth2User) authentication.getPrincipal();

                    String name = user.getAttribute("name");
                    String email = user.getAttribute("email");

                    // Print OAuth response in backend console
                    System.out.println("========== GOOGLE OAUTH RESPONSE ==========");
                    System.out.println("Name: " + name);
                    System.out.println("Email: " + email);
                    System.out.println("Google ID: " + user.getAttribute("sub"));
                    System.out.println("============================================");

                    // Send name and email to React
                    String redirectUrl =
                            "http://localhost:5173/callback"
                            + "?name="
                            + URLEncoder.encode(
                                    name != null ? name : "",
                                    StandardCharsets.UTF_8
                              )
                            + "&email="
                            + URLEncoder.encode(
                                    email != null ? email : "",
                                    StandardCharsets.UTF_8
                              );

                    response.sendRedirect(redirectUrl);
                })
            );

        return http.build();
    }
}

