package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UsersService;

import java.util.List;

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
        User admin = usersService.getUserByEmail(auth.getName());
        List<User> userList = usersService.getUsers();
        model.addAttribute("users", userList);
        model.addAttribute("admin", admin);
        return "admin";
    }

    @GetMapping("/new")
    public String newUser(Model model) {
        model.addAttribute("user", new User());
        return "create";
    }

    @PostMapping()
    public String addUser(@ModelAttribute("user") User user) {
        usersService.addUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String edit(Model model, @PathVariable("id") int id) {
        model.addAttribute("user", usersService.getUserById(id));
        return "edit";

    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute("user") User user) {
        usersService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        usersService.deleteUser(id);
        return "redirect:/admin";
    }
}
