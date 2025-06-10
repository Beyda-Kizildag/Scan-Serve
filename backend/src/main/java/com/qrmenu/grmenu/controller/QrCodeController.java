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

    @GetMapping(value = "/generate/{tableName}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getQrCode(@PathVariable String tableName) throws WriterException, IOException {
        String url = "http://localhost:5173?tableName=" + tableName;
        byte[] qrImage = QrCodeGenerator.generateQrCode(url, 300, 300);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrImage);
    }
}