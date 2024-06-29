package com.video_app.user;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final Set<User> users = new HashSet<>();

    public void register(User user) {
        user.setStatus("online");
        users.add(user);
    }

    public User login(User user) {
        var existingUser = users.stream()
                .filter(u -> u.getEmail().equals(user.getEmail()) && u.getPassword().equals(user.getPassword()))
                .findFirst();
        if (existingUser.isEmpty()) {
            throw new RuntimeException("Could not find user!");
        }

        var u = existingUser.get();
        users.remove(u);

        u.setStatus("online");
        users.add(u);

        return u;
    }

    public void logout(String email) {
        var existingUser = users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst();
        if (existingUser.isEmpty()) {
            throw new RuntimeException("Could not find user!");
        }

        var u = existingUser.get();

        users.remove(u);
        u.setStatus("offline");
        users.add(u);
    }

    public Set<User> findAll() {
        return Collections.unmodifiableSet(users);
    }
}
