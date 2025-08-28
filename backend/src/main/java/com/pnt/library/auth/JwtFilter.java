package com.pnt.library.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        //get header Authorization from request
        String authHeader = request.getHeader("Authorization");

        //check header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            //get jwt and username
            String jwt = authHeader.substring(7); //remove "Bearer "
            String username = jwtService.extractUsernameFromAccessToken(jwt);

            //check username and user is not auth in SecurityContext
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                //get user from db
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                //check jwt
                if (jwtService.isTokenValid(jwt, userDetails)) {

                    //create authentication from userDetails
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    //set authentication to SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        }
        //call the next filter
        filterChain.doFilter(request, response);
    }
}
