package com.lifeinsurance.sdp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import com.lifeinsurance.sdp.auth.CustomLogoutHandler;
import com.lifeinsurance.sdp.auth.CustomLogoutSuccessHandler;
import com.lifeinsurance.sdp.repo.TokenRepo;



@Configuration
public class LogoutConfiguration {

    @Bean
    public CustomLogoutHandler logoutHandler(TokenRepo tokenRepo, JwtService jwtService) {
        return new CustomLogoutHandler(tokenRepo, jwtService);
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new CustomLogoutSuccessHandler();
    }
}