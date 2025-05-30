package com.example.spring.todo;


	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;

	import java.util.List;
	import java.util.Optional;

	@RestController
	@RequestMapping("/api/todos")
	@CrossOrigin(origins = "http://localhost:4200")  // Allow Angular frontend to access this API
	public class ToDoController {

	    private final ToDoRepository todoRepository;

	    public ToDoController(ToDoRepository todoRepository) {
	        this.todoRepository = todoRepository;
	    }

	    @GetMapping
	    public List<ToDoModel> getAllTodos() {
	        return todoRepository.findAll();
	    }

	    @PostMapping
	    public ToDoModel createTodo(@RequestBody ToDoModel todo) {
	        return todoRepository.save(todo);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<ToDoModel> updateTodo(@PathVariable Long id, @RequestBody ToDoModel todoDetails) {
	        return todoRepository.findById(id).map(todo -> {
	            todo.setTitle(todoDetails.getTitle());
	            todo.setCompleted(todoDetails.isCompleted());
	            todoRepository.save(todo);
	            return ResponseEntity.ok(todo);
	        }).orElse(ResponseEntity.notFound().build());
	    }
	    
	    @GetMapping("/todos/{id}")
	    public ResponseEntity<ToDoModel> getTodoById(@PathVariable Long id) {
	        Optional<ToDoModel> todo = todoRepository.findById(id);
	        if (todo.isPresent()) {
	            return ResponseEntity.ok(todo.get());
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }


	    @DeleteMapping("/{id}")
	    public ResponseEntity<Object> deleteTodo(@PathVariable Long id) {
	        return todoRepository.findById(id).map(todo -> {
	            todoRepository.delete(todo);
	            return ResponseEntity.noContent().build();
	        }).orElse(ResponseEntity.notFound().build());
	    }
	}
