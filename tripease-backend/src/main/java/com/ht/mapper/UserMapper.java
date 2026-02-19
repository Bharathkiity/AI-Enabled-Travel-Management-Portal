package com.ht.mapper;


import org.springframework.stereotype.Component;

import com.ht.dto.response.AuthenticationResponse;
import com.ht.entity.User;

@Component
public class UserMapper {
    
    public AuthenticationResponse toAuthenticationResponse(User user, String token) {
        return AuthenticationResponse.builder()
                .token(token)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }
}