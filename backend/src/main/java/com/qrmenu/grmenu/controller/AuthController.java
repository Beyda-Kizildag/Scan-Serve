package com.qrmenu.grmenu.controller;

import com.qrmenu.grmenu.model.User;
import com.qrmenu.grmenu.repository.UserRepository;
import com.qrmenu.grmenu.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userRepository.findByName(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                String token = jwtUtil.generateToken(user.getName());
                return ResponseEntity.ok(token);
            }
        }

        return ResponseEntity.status(401).body("Invalid username or password");
    }
}