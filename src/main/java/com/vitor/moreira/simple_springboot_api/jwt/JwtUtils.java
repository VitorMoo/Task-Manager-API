package com.vitor.moreira.simple_springboot_api.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Slf4j
public class JwtUtils {

    private static final String JWT_BEARER = "Bearer ";

    private static final String JWT_AUTHORIZATION = "Authorization";

    private static final String SECRET_KEY = "0123456789-9876123450-9876543210";

    private static final long EXPIRE_DAYS = 0;

    private static final long EXPIRE_HOURS = 0;

    private static final long EXPIRE_MINUTES = 2;

    private JwtUtils() {

    }

    private static Key generateKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    private static Date toExpireDate(Date start) {
        LocalDateTime dateTime = start.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDateTime end = dateTime.plusDays(EXPIRE_DAYS).plusHours(EXPIRE_HOURS).plusMinutes(EXPIRE_MINUTES);
        return Date.from(end.atZone(ZoneId.systemDefault()).toInstant());
    }

    private static JwtToken createJwtToken(String username, String role) {
        Date limit = toExpireDate(new Date());
        Date issuedAt = new Date();


        String token = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(username)
                .setIssuedAt(issuedAt)
                .setExpiration(limit)
                .signWith(generateKey(), SignatureAlgorithm.HS256)
                .claim("role", role)
                .compact();
        return new JwtToken(token);

    }

    private static Claims getClaimsFromToken(String token) {

        try {
            return Jwts.parserBuilder().setSigningKey(generateKey())
                    .build().parseClaimsJws(Refactor(token)).getBody();
        } catch (JwtException e) {
            log.error(String.format("token invalido %s", token), e.getMessage());
        }
        return null;
    }

    private final String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    private static boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(generateKey())
                    .build().parseClaimsJws(Refactor(token));
            return true;
        } catch (JwtException e) {
            log.error(String.format("token invalido %s", token), e.getMessage());
        }
        return false;
    }

    private static String Refactor(String token) {
        if (token.contains(JWT_BEARER)) {
            return token.substring(JWT_BEARER.length());
        }
        return token;
    }

}
