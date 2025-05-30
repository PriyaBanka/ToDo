package com.example.spring.todo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDoModel, Long>{

}
