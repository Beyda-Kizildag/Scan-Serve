package com.qrmenu.grmenu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.qrmenu.grmenu.repository.UserRepository;
import com.qrmenu.grmenu.dto.LoginRequest;
import com.qrmenu.grmenu.model.User;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Sadece frontend portunu ekledik
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
Optional<User> userOpt = userRepository.findByName(request.getName());

if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
    User user = userOpt.get();
    Map<String, String> response = new HashMap<>();
    response.put("status", "success");
    response.put("role", user.getRole());
    response.put("name", user.getName());
    response.put("id", user.getId());
    return ResponseEntity.ok(response);
}
 else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı adı veya şifre yanlış");
        }
    }

}