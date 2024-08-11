package com.lifeinsurance.sdp.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lifeinsurance.sdp.config.JwtService;
import com.lifeinsurance.sdp.model.Customer;
import com.lifeinsurance.sdp.model.Token;
import com.lifeinsurance.sdp.repo.CustomerRepository;
import com.lifeinsurance.sdp.repo.TokenRepo;

@Service
@RequiredArgsConstructor
public class AuthenticationService {


    private final CustomerRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepo tokenRepo;

    public AuthenticationResponse register(RegisterRequest request) {
        var user  = Customer.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();

    }

    private void saveUserToken(Customer customer, String accessToken) {
        var token = Token.builder().customer(customer).token(accessToken).expired(false).revoked(false).build();
        tokenRepo.save(token);
    }

    private void revokeAllUserTokens(Customer customer) {
        var validUserTokens = tokenRepo.findAllByCustomer_IdAndExpiredFalseAndRevokedFalse(customer.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepo.saveAll(validUserTokens);
    }

    public void logout(String username) {
        System.out.println("Logout Functionality Called");
        var user = userRepo.findByEmail(username).orElseThrow();
        revokeAllUserTokens(user);
    }


}
