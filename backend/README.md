# AsyncPad Backend

## Introduction

This is the backend for the AsyncPad application, a collaborative document editing tool. It provides a RESTful API for user authentication, profile management, and document operations.

**Base URL**: `http://localhost:3000` (or your configured port)

## Features

- **User Authentication**: Secure signup, login, and token refreshing using JWTs.
- **User Profile Management**: View, update, and delete user profiles.
- **AsyncPad Documents**: Create, read (list & detail), update, and delete documents.
- **Secure Access**: Role-based or ownership-based access control for resources.

## Clean Architecture

This project follows **Clean Architecture** principles to ensure separation of concerns, scalability, and maintainability.

1.  **Domain Layer** (`src/domain`): Contains the core business logic and entities. It defines _what_ the system does.
    - **Entities**: Core business objects (e.g., `User`, `AsyncPadDocument`).
    - **Repository Interfaces**: Abstractions for data access (e.g., `IUserRepository`).
    - **Errors**: Domain-specific error types.
2.  **Application Layer** (`src/application`): Orchestrates the business logic using Use Cases.
    - **Use Cases**: Specific application actions (e.g., `CreateAsyncPadDocumentUsecase`). They depend only on the Domain layer.
    - **DTOs**: Data Transfer Objects for input/output boundaries.
3.  **Infrastructure Layer** (`src/infrastructure`): Implements the interfaces defined in the Domain layer.
    - **Repositories**: Concrete implementations using Mongoose (e.g., `AsyncPadRepository`).
    - **Models**: Mongoose schemas and models.
    - **Mappers**: Transforms database models to domain entities.
4.  **API Layer** (`src/api`): Handles external requests.
    - **Controllers**: Handles HTTP requests and responses.
    - **Routers**: Defines API endpoints.
    - **Schemas**: Zod schemas for request validation.
    - **Middleware**: Handles authentication, validation, and errors.
5.  **DI Layer** (`src/di`): Manages dependencies using `InversifyJS`.

## REST API Reference

### Authentication (`/api/v1/auth`)

#### Signup

- **Endpoint**: `POST /signup`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "password": "securepassword",
    "fullname": "John Doe",
    "avatarUrl": "http://example.com/avatar.png", // Optional
    "about": "New user" // Optional
  }
  ```

#### Login

- **Endpoint**: `POST /login`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "password": "securepassword"
  }
  ```

#### Refresh Token

- **Endpoint**: `POST /refresh-token`
- **Body**:
  ```json
  {
    "token": "your_refresh_token"
  }
  ```

### Profile (`/api/v1/profile`)

All endpoints require a valid Access Token in headers/cookies.

#### Get My Profile

- **Endpoint**: `GET /me`

#### Update My Profile

- **Endpoint**: `PATCH /me`
- **Body** (all fields optional):
  ```json
  {
    "username": "newusername",
    "fullname": "New Name",
    "about": "Updated bio",
    "avatarUrl": "http://example.com/new-avatar.png"
  }
  ```

#### Delete My Profile

- **Endpoint**: `DELETE /me`

### Documents (`/api/v1/pad`)

All endpoints require a valid Access Token.

#### Create Document

- **Endpoint**: `POST /`
- **Body**:
  ```json
  {
    "title": "My New Doc",
    "currentContent": "Initial content..."
  }
  ```

#### Get User Documents (List)

- **Endpoint**: `GET /`

#### Get Document Detail

- **Endpoint**: `GET /:id`

#### Update Document

- **Endpoint**: `PATCH /:id`
- **Body** (all fields optional):
  ```json
  {
    "title": "Updated Title",
    "currentContent": "Updated content..."
  }
  ```

#### Delete Document

- **Endpoint**: `DELETE /:id`

## Tools and Libraries

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Adds static types to JavaScript for better developer experience and code quality.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **InversifyJS**: Powerful and lightweight inversion of control (IoC) container for TypeScript.
- **Zod**: TypeScript-first schema declaration and validation library.
- **Bcrypt**: Library to help you hash passwords.
- **Jsonwebtoken (JWT)**: Compact, URL-safe means of representing claims to be transferred between two parties.
- **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.

## Setup and Configuration

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file in the root directory and configure the following variables (example):

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/asyncpad
    jwt_secret=your_super_secret_key
    ```

3.  **Run Development Server**:

    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:3000`.

4.  **Build and Run for Production**:
    ```bash
    npm run build
    npm start
    ```
