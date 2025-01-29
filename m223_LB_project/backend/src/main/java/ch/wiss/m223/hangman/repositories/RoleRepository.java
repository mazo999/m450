package ch.wiss.m223.hangman.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.wiss.m223.hangman.model.ERole;
import ch.wiss.m223.hangman.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    	Optional<Role> findByName(ERole name);
}