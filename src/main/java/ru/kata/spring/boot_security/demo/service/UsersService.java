package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UsersService {
    void addUser(User user);

    List<User> getUsers();

    void updateUser(User user);

    void deleteUser(int id);

    User getUserById(int id);

    User getUserByEmail(String email);
}
