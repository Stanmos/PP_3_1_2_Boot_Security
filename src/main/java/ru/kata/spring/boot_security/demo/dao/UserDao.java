package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    void addUser(User user);

    void addRole(Role role);

    Role getRole(String role);

    List<Role> getAllRoles();

    List<User> getUsers();

    void updateUser(User user);

    void deleteUser(int id);

    User getUserById(int id);

    User getUserByEmail(String email);
}
