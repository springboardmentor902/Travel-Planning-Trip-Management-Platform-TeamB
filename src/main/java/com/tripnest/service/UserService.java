package com.tripnest.service;

import org.springframework.stereotype.Service;

import com.tripnest.entity.User;
import com.tripnest.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveOrUpdateUser(String name, String email) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            // New Google user, USER by default
            user = new User(name, email, null, "USER");
        } else {
            // Existing user, don't change their role
            user.setFullName(name);
        }

        return userRepository.save(user);
    }
}