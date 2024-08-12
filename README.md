# Task Management Application

## Overview

This is a Task Management Application built with React and TypeScript for the frontend, and Node.js with Express and TypeScript for the backend. The application features basic CRUD operations for tasks, a UI slider for navigating between task categories, advanced async operations to fetch streaming data, and automatic task timeout handling.

## Features

- **Frontend:**
  - Task List: Display tasks.
  - Task Item: Individual task details.
  - Task Form: Add/edit tasks.
  - Category Slider: Switch between different task categories (e.g., "To Do", "In Progress", "Done", "Timeout").
  - Search and Filter: Search and filter tasks based on various criteria.
  - State Management: Using React hooks or Context API.
  - Timeout Handling: Automatically move tasks to the "Timeout" category if their duration exceeds a certain limit.

- **Backend:**
  - CRUD Operations: Create, read, update, and delete tasks.
  - Streaming Data: Fetch data from a streaming API and integrate it with task details.
  - Task Timeout Handling: Manage and update task timeout status.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ayushmanlakshkar/Todo.git
   cd Todo
   ```

2. **Install dependencies for frontend:**

   ```bash
   cd client
    npm install
    # or
    yarn install
    ```
3. **Install dependencies for backend**
   ```bash
   cd server
    npm install
    # or
    yarn install
    ```

### Running the Application

1. **Start the backend server:**

    ```bash
    cd server
    npm start
    # or
    yarn start
    ```

2. **Start the frontend application:**
   ```bash
    cd client
    npm start
    # or
    yarn start
    ```

## Endpoints

### Backend Endpoints
- **GET /tasks**: Fetch all tasks.
- **GET /tasks/:id**: Fetch a single task by ID.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update a task by ID.
- **DELETE /tasks/:id**: Delete a task by ID.
- **GET /streaming**: Fetch data from a streaming API.

## Deployment
- **Frontend**: Deployed on Vercel or Netlify.
- **Backend**: Deployed on AWS, Heroku, or Render.

## Environment Configuration
- **Frontend**: Configure environment variables for API URLs in `.env` file.
- **Backend**: Configure environment variables in `.env` file.

## Documentation
- **Frontend Components**: See `/client/src/components/`.
- **Backend Routes**: See `/server/src/routes/`.

## Contributing
Feel free to submit issues, contribute code, or suggest improvements. Please refer to the `CONTRIBUTING.md` for guidelines.


