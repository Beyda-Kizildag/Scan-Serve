package com.qrmenu.grmenu.controller;

import com.google.zxing.WriterException;
import com.qrmenu.grmenu.util.QrCodeGenerator;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/qr")
public class QrCodeController {

    @GetMapping(value = "/table/{tableNumber}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getQrCode(@PathVariable int tableNumber) throws WriterException, IOException {
        String url = "http://10.192.47.211:5173/menu?table=" + tableNumber;
        byte[] qrImage = QrCodeGenerator.generateQrCode(url, 300, 300);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrImage);
    }
}