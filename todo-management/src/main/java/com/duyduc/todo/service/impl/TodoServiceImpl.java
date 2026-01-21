package com.duyduc.todo.service.impl;

import com.duyduc.todo.dto.TodoDto;
import com.duyduc.todo.entity.Todo;
import com.duyduc.todo.exception.ResourceNotFoundException;
import com.duyduc.todo.mapper.TodoMapper;
import com.duyduc.todo.repository.TodoRepo;
import com.duyduc.todo.service.TodoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TodoServiceImpl implements TodoService {

    private TodoRepo todoRepo;

    private TodoMapper todoMapper;

    public TodoServiceImpl(TodoRepo todoRepo, TodoMapper todoMapper) {
        this.todoRepo = todoRepo;
        this.todoMapper = todoMapper;
    }

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = todoMapper.toEntity(todoDto);

        Todo savedTodo = todoRepo.save(todo);

        return todoMapper.toDto(savedTodo);
    }

    @Override
    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Todo not found with given id: " + id));
        TodoDto dto = todoMapper.toDto(todo);

        return dto;
    }

    @Override
    public List<TodoDto> getAllTodo() {
        List<Todo> todos = todoRepo.findAll();
        List<TodoDto> dtos = new ArrayList<>();
        for(Todo todo : todos) {
            dtos.add(todoMapper.toDto(todo));
        }
        return dtos;
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto dto) {
        Todo todo = todoRepo.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Todo not found with id: " + id));
        todo.setTitle(dto.getTitle());
        todo.setDescription(dto.getDescription());
        todo.setCompleted(dto.getCompleted());

        Todo updatedTodo = todoRepo.save(todo);

        return todoMapper.toDto(updatedTodo);
    }

    @Override
    public TodoDto patchTodo(Long id, TodoDto dto) {
        Todo todo = todoRepo.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Todo not found with id: " + id));
        if(dto.getTitle() != null && !dto.getTitle().isBlank()) todo.setTitle(dto.getTitle());
        if(dto.getDescription() != null && !dto.getDescription().isBlank()) todo.setDescription(dto.getDescription());
        if(dto.getCompleted() != null) todo.setCompleted(dto.getCompleted());

        Todo updatedTodo = todoRepo.save(todo);

        return todoMapper.toDto(updatedTodo);
    }

    @Override
    public void deleteTodoById(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Todo not found with id: " + id));
        todoRepo.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Todo not found with id: " + id));
        todo.setCompleted(true);
        Todo updatedTodo = todoRepo.save(todo);
        return todoMapper.toDto(updatedTodo);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Todo not found with id: " + id));
        todo.setCompleted(false);
        Todo updatedTodo = todoRepo.save(todo);
        return todoMapper.toDto(updatedTodo);
    }

}
