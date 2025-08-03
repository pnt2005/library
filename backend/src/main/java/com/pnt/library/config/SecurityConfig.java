package com.pnt.library.config;

import com.pnt.library.auth.CustomAccessDeniedHandler;
import com.pnt.library.auth.CustomAuthenticationEntryPoint;
import com.pnt.library.auth.CustomUserDetailsService;
import com.pnt.library.auth.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorize) -> authorize
                        //public access
                        .requestMatchers("/", "/auth/**").permitAll()

                        //admin
                        .requestMatchers(HttpMethod.POST, "/admin/**").permitAll()

                        //reader
                        .requestMatchers(HttpMethod.GET, "/readers/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/readers/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/readers/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/readers/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/readers/**").hasRole("ADMIN")

                        //book
                        .requestMatchers(HttpMethod.GET, "/books/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/books/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/books/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/books/**").hasRole("ADMIN")

                        //borrow-receipt
                        .requestMatchers(HttpMethod.GET, "/borrow-receipts/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/borrow-receipts/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/borrow-receipts/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/borrow-receipts/**").hasRole("ADMIN")

                        //purchase-receipt
                        .requestMatchers(HttpMethod.GET, "/purchase-receipts/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/purchase-receipts/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/purchase-receipts/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/purchase-receipts/**").hasRole("ADMIN")

                        //default
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
}
