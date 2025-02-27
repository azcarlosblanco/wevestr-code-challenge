# Full Stack Todo Application

A modern todo list application built with React and Node.js, featuring a TypeScript implementation on both frontend and backend.

## Project Structure

The project is divided into two main directories:
- `client/`: React frontend application
- `server/`: Node.js backend application

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

You can install dependencies using one of these two methods:

#### Method 1: Using the setup script

```bash
chmod +x setup.sh
./setup.sh
```

#### Method 2: Manually installing dependencies

1. Clone the repository
2. Install dependencies for both client and server:

```bash
cd client
npm install
cd ../server
npm install
```

### Running the Application

You can run both applications using one of these methods:

#### Method 1: Using the start scripts in the root directory

```bash
chmod +x start-server.sh
chmod +x start-client.sh
./start-server.sh
./start-client.sh
```

#### Method 2: Manually running the applications

```bash
cd client
npm run dev
cd ../server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Testing

### Client-Side Testing

The client-side application uses Jest for testing. To run the tests:

```bash
cd client
npm test
```

### Server-Side Testing

The server-side application uses Jest for testing. To run the tests:

```bash
cd server
```

## Implementation Details

### Frontend Implementation

The client-side application is built with:
- React 19 with TypeScript
- Vite for fast development and building
- Material-UI (MUI) for component styling
- Redux Toolkit for state management
- Axios for API communication

Key features:
- Responsive design
- Real-time task updates
- Form validation
- Confirmation dialogs for destructive actions
- Edit mode for tasks
- Task completion toggling

### Backend Implementation

The server-side application uses:
- Node.js with Express
- TypeScript for type safety
- SQLite3 for data persistence
- Jest for testing

Features:
- RESTful API design
- Error handling middleware
- Database abstraction layer
- Environment configuration
- Comprehensive test coverage

### Key Libraries Used

Frontend:
- @mui/material: UI component library
- @reduxjs/toolkit: State management
- axios: HTTP client
- react-redux: Redux bindings for React
- TypeScript: Static typing

Backend:
- express: Web framework
- sqlite3: Database
- cors: Cross-origin resource sharing
- morgan: HTTP request logger
- jest: Testing framework
- supertest: HTTP testing

## API Endpoints

- GET `/api/tasks`: Retrieve all tasks
- POST `/api/tasks`: Create a new task
- PUT `/api/tasks/:id`: Update a task
- DELETE `/api/tasks/:id`: Delete a task
- GET `/api/tasks/:id`: Get a specific task

## Testing

The project includes comprehensive test coverage for both frontend and backend:

- Frontend tests cover:
  - Component rendering
  - Redux state management
  - API integration
  - User interactions

- Backend tests cover:
  - API endpoints
  - Database operations
  - Error handling
  - Input validation

## Development Choices

1. **TypeScript**: Used throughout the project for better type safety and developer experience.
2. **SQLite**: Chosen for its simplicity and zero-configuration setup.
3. **Material-UI**: Provides a consistent and professional look with minimal custom CSS.
4. **Redux Toolkit**: Simplifies state management with built-in immutability and thunk support.
5. **Jest**: Comprehensive testing framework that works well with both React and Node.js.

## Future Improvements

- User authentication
- Task categories/tags
- Due dates for tasks
- Task priority levels
- Batch operations
- Data export/import