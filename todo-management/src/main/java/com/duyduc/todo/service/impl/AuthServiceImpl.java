package com.duyduc.todo.service.impl;

import com.duyduc.todo.dto.JwtAuthResponse;
import com.duyduc.todo.dto.LoginDto;
import com.duyduc.todo.dto.RegisterDto;
import com.duyduc.todo.entity.Role;
import com.duyduc.todo.entity.User;
import com.duyduc.todo.exception.ResourceNotFoundException;
import com.duyduc.todo.exception.TodoAPIException;
import com.duyduc.todo.repository.RoleRepo;
import com.duyduc.todo.repository.UserRepo;
import com.duyduc.todo.security.JwtTokenProvider;
import com.duyduc.todo.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepo userRepo;
    private RoleRepo roleRepo;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Transactional
    @Override
    public String register(RegisterDto registerDto) {

        //check if username existed
        if (userRepo.existsByUsername(registerDto.getUsername()))
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Username existed");

        //check if email existed
        if (userRepo.existsByEmail(registerDto.getEmail()))
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Email existed");

        User user = new User();

        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepo.findByName("ROLE_USER")
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        roles.add(role);

        user.setRoles(roles);

        userRepo.save(user);

        return "User registered successfully";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        User user = userRepo.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail()).get();

        String userRole = user.getRoles().stream().findFirst().map(role -> role.getName())
                .orElse("ROLE_USER");

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setRole(userRole);

        return jwtAuthResponse;
    }
}
