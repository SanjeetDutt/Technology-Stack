package in.sanjeetdutt.zohocloneapp.main.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(HelloController.HELLO_CONTROLLER_PATH)
public class HelloController {

    public static final String HELLO_CONTROLLER_PATH = "/hello";

    @GetMapping
    public String HelloWorld() {
        return "Hello World";
    }
}
