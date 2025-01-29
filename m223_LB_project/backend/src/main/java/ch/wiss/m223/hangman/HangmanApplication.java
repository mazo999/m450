package ch.wiss.m223.hangman;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import ch.wiss.m223.hangman.model.ERole;
import ch.wiss.m223.hangman.model.Role;
import ch.wiss.m223.hangman.repositories.RoleRepository;

@RestController
@SpringBootApplication
public class HangmanApplication implements CommandLineRunner {

	@Autowired
	RoleRepository roleRepository;


	public static void main(String[] args) {
		SpringApplication.run(HangmanApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		if (roleRepository.count() == 0) {
			roleRepository.save(new Role(ERole.ROLE_USER));
			roleRepository.save(new Role(ERole.ROLE_ADMIN));
		}
	}

}
