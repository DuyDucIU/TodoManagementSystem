package com.duyduc.todo.service;

import com.duyduc.todo.dto.JwtAuthResponse;
import com.duyduc.todo.dto.LoginDto;
import com.duyduc.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
}
