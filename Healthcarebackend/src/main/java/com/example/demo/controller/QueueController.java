package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class QueueController {

    @GetMapping("/queue/{phone}")
    public Map<String, Object> getQueue(@PathVariable String phone) {

        Map<String, Object> response = new HashMap<>();

        response.put("patientName", "Ravi");
        response.put("doctor", "Dr Sharma");
        response.put("queueNumber", 3);
        response.put("currentServing", 1);

        int estimatedTime = (3 - 1) * 10;

        response.put("estimatedTime", estimatedTime);

        return response;
    }
}