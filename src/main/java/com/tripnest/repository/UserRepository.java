package com.tripnest.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tripnest.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}