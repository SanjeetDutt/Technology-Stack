package com.sanjeetdutt.practice_001.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirstController {

    @GetMapping("/")
    public String firstMessage(){
        return "Hello World";
    }
}
