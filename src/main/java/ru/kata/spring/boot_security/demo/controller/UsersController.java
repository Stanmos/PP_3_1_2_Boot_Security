package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UsersService;

import java.util.List;

@Controller
public class UsersController {

    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/user")
    public String userInfo(Authentication auth, ModelMap model) {
        User user = usersService.getUserByEmail(auth.getName());
        model.addAttribute("currentuser", user);
        model.addAttribute("allRoles", usersService.getAllRoles());

        model.addAttribute("user", new User());
        List<User> userList = usersService.getUsers();
        model.addAttribute("users", userList);
        return "admin";
    }

}
