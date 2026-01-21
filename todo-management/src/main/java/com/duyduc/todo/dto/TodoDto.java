package com.duyduc.todo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
    private Long id;

    @NotBlank(message = "Title can not be blank or empty")
    private String title;

    @NotBlank(message = "Description can not be blank or empty")
    private String description;
    private Boolean completed;

//    public TodoDto() {
//
//    }
//
//    public TodoDto(Long id, String title, String description, Boolean completed) {
//        this.id = id;
//        this.title = title;
//        this.description = description;
//        this.completed = completed;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public Boolean getCompleted() {
//        return completed;
//    }
//
//    public void setCompleted(Boolean completed) {
//        this.completed = completed;
//    }
}
