package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UsersService;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UsersService usersService;
    @Autowired
    public AdminController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping()
    public String getUsers(Authentication auth, ModelMap model) {
        User currentuser = usersService.getUserByEmail(auth.getName());
        model.addAttribute("currentuser", currentuser);
        model.addAttribute("allRoles", usersService.getAllRoles());
        return "admin";
    }
}
