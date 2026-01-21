package com.duyduc.todo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class TodoAPIException extends RuntimeException {
    private HttpStatus httpStatus;
    private String message;
}
