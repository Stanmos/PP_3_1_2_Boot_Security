package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UsersServiceImpl implements UsersService {

    private final UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersServiceImpl(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void addUser(User user) {
        if (user.getRoles() == null) {
            user.setRoles(Set.of(getRole("ROLE_USER")));
        } else {
            Set<Role> roles = new HashSet<>();
            for (Role r : user.getRoles()) {
                roles.add(getRole(r.getRole()));
            }
            user.setRoles(roles);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.addUser(user);
    }

    @Override
    public void addRole(Role role) {
        userDao.addRole(role);
    }

    @Override
    @Transactional(readOnly = true)
    public Role getRole(String role) {
        return userDao.getRole(role);
    }


    @Override
    public List<Role> getAllRoles() {
        return userDao.getAllRoles();
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getUsers() {
        return userDao.getUsers();
    }

    @Override
    public void updateUser(User user) {
        if (user.getRoles() == null) {
            user.setRoles(Set.of(getRole("ROLE_USER")));
        } else {
            Set<Role> roles = new HashSet<>();
            for (Role r : user.getRoles()) {
                roles.add(getRole(r.getRole()));
            }
            user.setRoles(roles);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.updateUser(user);
    }

    @Override
    public void deleteUser(int id) {
        userDao.deleteUser(id);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(int id) {
        return userDao.getUserById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
    }
}
