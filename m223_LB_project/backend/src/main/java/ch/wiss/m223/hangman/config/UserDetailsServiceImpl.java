package ch.wiss.m223.hangman.config;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ch.wiss.m223.hangman.model.User;
import ch.wiss.m223.hangman.repositories.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
  @Autowired
  UserRepository userRepository;
  @Override
  @Transactional
  public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    Set<GrantedAuthority> authorities = user.getRoles().stream()
        .map((role) -> new SimpleGrantedAuthority(role.toString()))
        .collect(Collectors.toSet());
    return UserDetailsImpl.build(user);
  }
}