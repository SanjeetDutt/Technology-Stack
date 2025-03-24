# API keep throwing 403 Forbidden error for all methods except GET
- this is happening due to CORS of CSRF.
	- CORS = Cross-Origin Resource Sharing
	- CSRF = Cross-Site Request Forgery
	- Happens when we use spring starter security
- To fix this need to configure it in the spring configuration
```java
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
```