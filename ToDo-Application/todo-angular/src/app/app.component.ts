import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { Todo } from './todo.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoService = inject(TodoService);

  todos: Todo[] = [];
  newTodoTitle = '';

  editingTodoId: number | null = null;
  editingTitle = '';

  constructor() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => (this.todos = data));
  }

 addTodo(): void {
  const trimmedTitle = this.newTodoTitle.trim();

  if (!trimmedTitle) {
    alert('Task title cannot be empty.');
    return;
  }

  const duplicate = this.todos.find(todo => todo.title.toLowerCase() === trimmedTitle.toLowerCase());
  if (duplicate) {
    alert('Task with this title already exists.');
    return;
  }

  const newTodo = {
    title: trimmedTitle,
    completed: false
  };

  this.todoService.addTodo(newTodo).subscribe(addedTodo => {
    this.todos.push(addedTodo);
    this.newTodoTitle = '';
  });
}


  getTodoStatus(todo: any): void {
  const message = todo.completed ? 'Task is completed ✅' : 'Task is not completed ❌';
  alert(message);
}


  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(todo: Todo) {
    if (todo.id == null) return;
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }

  confirmAndDelete(todo: any): void {
  const confirmed = confirm(`Are you sure you want to delete the task: "${todo.title}"?`);
  if (confirmed) {
    this.deleteTodo(todo);
  }
}

  startEditing(todo: Todo) {
    this.editingTodoId = todo.id ?? null;
    this.editingTitle = todo.title;
  }

  saveEdit(todo: Todo) {
    if (!this.editingTitle.trim()) return;
    todo.title = this.editingTitle.trim();
    this.todoService.updateTodo(todo).subscribe(() => {
      this.editingTodoId = null;
      this.editingTitle = '';
    });
  }

  cancelEditing() {
    this.editingTodoId = null;
    this.editingTitle = '';
  }

  fetchTodoById(idStr: string) {
    const id = Number(idStr);
    if (isNaN(id)) {
      alert('Please enter a valid numeric ID');
      return;
    }
    this.todoService.getTodoById(id).subscribe({
      next: (todo) => {
        alert(`Fetched Todo: ${todo.title} (Completed: ${todo.completed})`);
      },
      error: () => {
        alert('Todo not found!');
      },
    });
  }
}
