package in.sanjeetdutt.zohocloneapp.main.controller;

import in.sanjeetdutt.zohocloneapp.data.model.user.User;
import in.sanjeetdutt.zohocloneapp.dto.request.user.UserCreateRequestDTO;
import in.sanjeetdutt.zohocloneapp.dto.request.user.UserLoginRequestDTO;
import in.sanjeetdutt.zohocloneapp.dto.response.user.UserResponseDTO;
import in.sanjeetdutt.zohocloneapp.exception.InternalServerError;
import in.sanjeetdutt.zohocloneapp.exception.UnauthorizedException;
import in.sanjeetdutt.zohocloneapp.main.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    IUserService userService;

    @PostMapping("login")
    public ResponseEntity<UserResponseDTO> loginUser(@RequestBody UserLoginRequestDTO userLoginRequestDTO){
        userLoginRequestDTO.validate();
        User user = userService.getUserByEmail(
                userLoginRequestDTO.getEmail()
        ).orElseThrow(()->
                new UnauthorizedException("Invalid email")
        );

        if(!userService.checkPassword(user, userLoginRequestDTO.getPassword())){
            throw new UnauthorizedException("Invalid password");
        }
        UserResponseDTO responseDTO = UserResponseDTO.getUserResponseDTO(user);
        return ResponseEntity.ok(responseDTO);
    };

    @PostMapping("create")
    public ResponseEntity<String> createNewUser(@RequestBody UserCreateRequestDTO userCreateRequestDTO){
        //Validate user input
        userCreateRequestDTO.validate();

        //Validate email is used first time
        Optional<User> existingUser = userService.getUserByEmail(userCreateRequestDTO.getEmail());

        if(existingUser.isPresent()){
            throw new UnauthorizedException("User already exists. Please try to login instead.");
        }

        Optional<User> user = userService.createUser(
                userCreateRequestDTO.getEmail(),
                userCreateRequestDTO.getPassword(),
                userCreateRequestDTO.getFirstName(),
                userCreateRequestDTO.getLastName()
        );

        if(user.isEmpty()){
            throw new InternalServerError("An error occurred while creating a new user");
        }

        return ResponseEntity.ok("Account create successful. Please login");
    };



}
