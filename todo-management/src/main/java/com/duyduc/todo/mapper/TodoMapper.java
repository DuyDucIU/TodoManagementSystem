package com.duyduc.todo.mapper;

import com.duyduc.todo.dto.TodoDto;
import com.duyduc.todo.entity.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TodoMapper {
    @Mapping(target = "id", ignore = true)
    Todo toEntity(TodoDto dto);
    TodoDto toDto(Todo todo);
}
