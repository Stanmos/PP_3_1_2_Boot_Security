package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    public UserDaoImpl() {
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void addRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    public Role getRole(String role) {
        Query query = entityManager.createQuery("from Role r where r.role = :name");
        query.setParameter("name", role);
        return (Role) query.getSingleResult();
    }

    @Override
    public List<Role> getAllRoles() {
        Query query = entityManager.createQuery("from Role");
        return query.getResultList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<User> getUsers() {
        Query query = entityManager.createQuery("select distinct u from User u left join fetch u.roles");
        return query.getResultList();
    }

    @Override
    public void updateUser(User user) {
        entityManager.merge(user);
    }

    @Override
    public void deleteUser(int id) {
        User user = entityManager.find(User.class, id);
        entityManager.remove(user);
    }

    @Override
    public User getUserById(int id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User getUserByEmail(String email) {
        Query query = entityManager.createQuery("from User u left join fetch u.roles where u.email = :email");
        query.setParameter("email", email);
        return (User) query.getSingleResult();
    }
}
