package in.sanjeetdutt.bookmyshow.controller;

import in.sanjeetdutt.bookmyshow.model.Region;
import in.sanjeetdutt.bookmyshow.service.RegionService;
import in.sanjeetdutt.bookmyshow.service.TheaterService;
import in.sanjeetdutt.bookmyshow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class GeneralController {

    @Autowired RegionService regionService;
    @Autowired UserService userService;

    @GetMapping("region")
    List<Region> getAllRegion(){
        return regionService.getAll();
    }

    @PostMapping("region")
    void addRegion(@RequestBody String regionName){
        regionService.addRegion(regionName);
    }

    @PostMapping("user")
    void addUser(@RequestBody Map<String, Object> request){
        userService.addUser(request.get("name").toString(), request.get("email").toString());
    }
}
