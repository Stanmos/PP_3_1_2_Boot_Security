package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class MyRestController {
    private final UsersService usersService;

    @Autowired
    public MyRestController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<User> getUsers() {
        List<User> userList = usersService.getUsers();
        return userList;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return usersService.getUserById(id);
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        usersService.addUser(user);
    }

    @PatchMapping("/{id}")
    public void editUser(@RequestBody User user) {
        usersService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        usersService.deleteUser(id);
    }
}
