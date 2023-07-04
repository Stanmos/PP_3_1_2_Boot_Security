package ru.kata.spring.boot_security.demo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UsersService;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UsersService usersService;

    @Autowired
    public DataInitializer(UsersService usersService) {
        this.usersService = usersService;
    }

    @Override
    public void run(String... args) {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        User admin = new User("admin", "Jackson", 30, "admin@mail.com", "100",
                new HashSet<>(Set.of(roleAdmin, roleUser)));
        User user = new User("user", "Petrov", 20, "user@mail.com", "100",
                new HashSet<>(Set.of(roleUser)));

        usersService.addRole(roleAdmin);
        usersService.addRole(roleUser);
        usersService.addUser(admin);
        usersService.addUser(user);
    }
}
