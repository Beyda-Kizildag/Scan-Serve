// package com.qrmenu.grmenu.controller;

// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.http.ResponseEntity;
// // import com.qrmenu.grmenu.dto.LoginRequest; // LoginRequest'in doğru paketini kullanın

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173") // Sadece frontend portunu ekledik
// public class AuthController {

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//         // Giriş işlemleri burada
//         // Başarılıysa token ve userRole dön
//         return ResponseEntity.ok().build(); // Geçici dönüş
//     }

//     // LoginResponse sınıfını geri döndür mapping işlemi yaparak
//     // @PostMapping("/login")
//     // public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//     //     // Örnek: Kullanıcı adı ve şifreyi kontrol et (gerçek projede servis katmanı ile yapılmalı)
//     //     String username = request.getUsername();
//     //     String password = request.getPassword();

//     //     // Örnek admin kontrolü
//     //     if ("admin".equals(username) && "admin123".equals(password)) {
//     //         // Token üretimini burada yapmalısınız (örnek olarak sabit string)
//     //         String token = "admin-token";
//     //         String userRole = "admin";
//     //         return ResponseEntity.ok(new LoginResponse(token, userRole));
//     //     }

//     //     // Örnek müşteri kontrolü (gerçek projede veritabanı sorgusu olmalı)
//     //     if ("customer1".equals(username) && "customer123".equals(password)) {
//     //         String token = "customer-token";
//     //         String userRole = "customer";
//     //         return ResponseEntity.ok(new LoginResponse(token, userRole));
//     //     }

//     //     // Hatalı giriş
//     //     return ResponseEntity.status(401).body(null);
//     // }
// }