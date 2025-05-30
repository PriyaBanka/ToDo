# ToDo List Application
--------------------------
**Overview**
A simple CRUD (Create, Read, Update, Delete) ToDo list application built with Angular for the frontend and Spring Boot for the backend.  
Users can add, edit, delete, mark tasks as completed, and fetch tasks by ID.

**Features**
- Add new tasks
- View all tasks
- Edit task title
- Delete tasks with confirmation popup
- Mark tasks as completed or not completed
- Fetch individual tasks by ID
- Display task completion status
- Duplicate task titles are prevented.
- Delete action shows a confirmation popup.

**Technologies Used**
- Frontend: Angular (with ngModel, *ngFor, event bindings)
- Backend: Spring Boot (REST API)
- Data format: JSON

**Backend API Endpoints**

| Method | URL                  | Description            |
|--------|----------------------|------------------------|
| GET    | /todos               | Get all tasks          |
| GET    | /todos/{id}          | Get a task by ID       |
| POST   | /todos               | Add a new task         |
| PUT    | /todos/{id}          | Update a task          |
| DELETE | /todos/{id}          | Delete a task by ID    |

## How to Run
-----------------
**Backend**
1. Navigate to backend project folder.
2. Run the Spring Boot application:
   ./mvnw spring-boot:run

3. API will run on http://localhost:8080.

**Frontend**
Navigate to the frontend project folder in your terminal or command prompt.

**Install dependencies:**
npm install (in your command prompt)

**Run Angular app:**
ng serve

Open browser at http://localhost:4200.
