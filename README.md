## TODO LIST APPLICATION

A simple and efficient Todo List application built with:
- React (Frontend)
- Node.js & Express (Backend)
- MongoDB (Database)

Easily manage tasks with priority-based organization, search functionality, and completion tracking.

## FEATURES

- Add new todos with a title, description, and priority (Low, Medium, High).
- Update, delete, or toggle completion status for tasks.
- Categorized display of tasks based on priority.
- Search functionality to filter tasks.
- Responsive design with Bootstrap for better user experience.


## PROJECT STRUCTURE
- **Frontend**: React components for user interaction.
- **Backend**: Node.js API with routes for todo operations.
- **Database**: MongoDB for storing tasks securely.


## REQUIREMENTS

Ensure the following are installed on your system:
- Node.js (v14 or later)
- MongoDB
- npm (Node Package Manager)


## SETUP INSTRUCTIONS

1. Clone the repository:
   git clone https://github.com/Manshi-12/Task-Sphere

2. Navigate to the project folder:
   cd Task-Sphere-Project

3. Setup the backend:
   - Navigate to the backend folder:
     cd backend
   - Install dependencies:
     npm install
   - Create a `.env` file with the following content:
     ```bash
     PORT=5000
     MONGO_URI=<your_mongo_connection_string>
     ```
   - Start the backend server:
     npm start

4. Setup the frontend:
   - Navigate to the frontend folder:
     cd ../my-todo-app   #(or you can name it frontend)
   - Install dependencies:
     npm install
   - Start the React application:
     npm start

5. Open the application:
   Visit `http://localhost:3000` in your browser.


## USAGE

- **Adding Tasks**: Click the "Add Todo" button and fill in the details in the modal form.
- **Editing Tasks**: Use the "Update" button to modify existing tasks.
- **Deleting Tasks**: Click the "Delete" button to remove a task.
- **Toggling Completion**: Check/uncheck the "Completed" box to mark tasks as done or undone.
- **Searching Tasks**: Use the search bar to filter tasks by title.


## API ENDPOINTS

- **GET /api/todos**: Fetch all todos for the logged-in user.
- **POST /api/todos**: Add a new todo.
- **PUT /api/todos/:id**: Update a todo by ID.
- **DELETE /api/todos/:id**: Delete a todo by ID.


