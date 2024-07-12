package in.sanjeetdutt.bookmyshow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class TestController {

    @GetMapping("test-connection")
    public String helloWorld(){
        return "HELLO WORLD";
    }

    @GetMapping("error-testing")
    public String testError(){
        throw new Error("ERROR TEST");
    }
}
