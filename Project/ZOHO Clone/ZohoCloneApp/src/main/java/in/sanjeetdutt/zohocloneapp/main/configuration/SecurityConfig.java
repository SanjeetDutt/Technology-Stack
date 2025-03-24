package in.sanjeetdutt.zohocloneapp.main.configuration;

import in.sanjeetdutt.zohocloneapp.main.controller.HelloController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(config->config.disable())
                .csrf(config->config.disable())
                .authorizeHttpRequests((request)-> request
//                        .requestMatchers(HelloController.HELLO_CONTROLLER_PATH).permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
