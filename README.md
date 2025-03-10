# User Management System with Express.js and Sequelize ORM

This is a **User Management System** built using **Node.js**, **Express.js**, and **Sequelize ORM**. The application allows users to perform basic CRUD (Create, Read, Update, Delete) operations on user data, while leveraging Sequelize to interact with an SQL database. The system follows the **Model-View-Controller (MVC)** architecture for better maintainability and modularity.

## Features

- **User Management**: Allows users to register, view, edit, and delete user records.
- **Sequelize ORM**: Interacts with a SQL database to store and manage user data.
- **Dynamic Data Management**: Users can create, edit, and delete user records and their associated projects.
- **One-to-Many Relationship**: Demonstrates how a user can have multiple projects, with Sequelize managing these relationships.
- **404 Error Handling**: A custom 404 error page is displayed when an invalid route is accessed.

## Screenshots
![image](https://github.com/user-attachments/assets/02955b9c-b967-4f16-b9e0-69b8ca697748)

![image](https://github.com/user-attachments/assets/90153628-a8fa-425b-89f4-f4a8dff252a4)

![image](https://github.com/user-attachments/assets/85d66f1d-73b7-40a6-b917-ed4cf6fdea7f)


[Screencast from 2025-03-07 12-02-05.webm](https://github.com/user-attachments/assets/be991af3-200e-4367-9bba-98f0cbc579c7)

## Requirements

To get started, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sudip200/Node-assignment-4/
   cd node-assignment-4
   ```

2. **Install Dependencies**

   Install all required dependencies via npm:

   ```bash
   npm install
   ```

3. **Set Up the Database**

   Ensure that you have an SQL database (e.g., MySQL, PostgreSQL, SQLite) set up and configured.

4. **Configure Database Connection**

   Edit the `config/config.js` file to match your database connection credentials. The file should look something like:

   ```js
   module.exports = {
     database: 'your-database-name',
     username: 'your-username',
     password: 'your-password',
     host: 'localhost',
     dialect: 'mysql',  // Change to 'postgres', 'sqlite' as needed
   };
   ```

5. **Run the Application**

   After setting up the database connection and installing dependencies, run the application using the following command:

   ```bash
   npm start
   ```

   The server will start on port 3000. Open a browser and go to `http://localhost:3000` to see the application in action.

## Folder Structure

```plaintext
.
├── config/                # Configuration files for the app (e.g., database config)
├── controllers/           # Controller files that handle the business logic
├── models/                # Sequelize models defining database schema
├── public/                # Static files like CSS, images, JS
├── routes/                # Express routes defining application endpoints
├── views/                 # EJS templates for rendering UI
├── server.js              # The entry point of the application
└── package.json           # npm configuration file with project dependencies
```

## Application Routes

- **Home Route**: `GET /`
  - Displays a welcome message.
  
- **User Creation Route**: `GET /create`
  - Displays the user creation form.
  
- **User Add Route**: `POST /add`
  - Handles user creation and saves it to the database.
  
- **User List Route**: `GET /users`
  - Displays a list of all users in the database.

- **Edit User Route**: `GET /edit/:id`
  - Displays the form for editing an existing user.

- **Update User Route**: `POST /edit/:id`
  - Handles updating an existing user's information in the database.

- **Delete User Route**: `GET /delete/:id`
  - Deletes a user from the database.

- **Project Creation Route**: `GET /projects/:id`
  - Displays the project creation form for a specific user.

- **Create Project Route**: `POST /createproject/:id`
  - Creates a new project associated with a user.

- **View Projects Route**: `GET /viewprojects/:id`
  - Displays a list of projects for a specific user.

- **Delete Project Route**: `GET /deleteproject/:id/:userId`
  - Deletes a project for a specific user.

## Database Model

The application uses Sequelize to define two models:

### User Model

- `id` (Primary Key)
- `firstname` (String)
- `lastname` (String)
- `profilePic` (String - URL to profile picture)
- `techStack` (String - User's tech stack)

### Project Model

- `id` (Primary Key)
- `title` (String)
- `description` (String)
- `userId` (Foreign Key referencing User)

### Sequelize Associations

- **One-to-Many Relationship**: A user can have multiple projects, represented by a `hasMany` association between `User` and `Project`.

```js
User.hasMany(Project, { onDelete: 'CASCADE' });
Project.belongsTo(User, { onDelete: 'CASCADE' });
```

## Validation and Error Handling

- **Form Validation**: The app validates user input using **express-validator** to ensure that input fields like first name, last name, and profile picture URL are correctly formatted.
- **Error Handling**: The application has centralized error handling and custom 404 pages. It gracefully handles both validation errors and runtime errors.

## Evaluation Criteria

The project will be evaluated based on the following criteria:

1. **Project Setup** (1.5 Points)
   - Correct use of MVC architecture
   - Proper configuration of Sequelize ORM and database connection

2. **Implement Routes & Functionality** (9.5 Points)
   - Correct implementation of routes for user management
   - Form validation and error handling
   - Proper dynamic data rendering for user and project management

3. **Database Implementation** (5 Points)
   - Use of Sequelize for database CRUD operations
   - Proper implementation of a One-to-Many relationship (User-Projects)

4. **404 Page Implementation** (1 Point)
   - Displays a custom 404 error page for invalid routes.

5. **Code Quality & Best Practices** (3 Points)
   - Clean, readable, and modular code with proper comments
   - Correct and consistent use of variable and function names

## Conclusion

This project is a practical exercise in working with **Node.js**, **Express.js**, **Sequelize ORM**, and building a structured, maintainable web application. It covers core aspects of backend development, including routing, form handling, data validation, error handling, and database management.

