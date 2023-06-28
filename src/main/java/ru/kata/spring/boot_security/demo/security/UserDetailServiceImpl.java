package ru.kata.spring.boot_security.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.service.UsersService;

public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UsersService usersService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersService.getUserByEmail(username);
    }
}
