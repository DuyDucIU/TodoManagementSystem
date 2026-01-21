package com.duyduc.todo.service;

import com.duyduc.todo.dto.TodoDto;

import java.util.List;

public interface TodoService {
    TodoDto addTodo(TodoDto todoDto);
    TodoDto getTodoById(Long id);
    List<TodoDto> getAllTodo();
    TodoDto updateTodo(Long id, TodoDto dto);
    TodoDto patchTodo(Long id, TodoDto dto);
    void deleteTodoById(Long id);
    TodoDto completeTodo(Long id);
    TodoDto inCompleteTodo(Long id);
}
