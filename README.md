# Blog APIs

A RESTful API for a blogging platform built with Node.js, Express, and MongoDB.

## Features

- User registration, login, and logout
- Email verification with OTP
- Password reset via email
- User roles: admin, ultimate admin, regular user
- CRUD operations for blog posts and comments
- Profile picture upload and management
- JWT-based authentication and authorization


## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd BlogApis
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=5000
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_HOST=smtp.example.com
    EMAIL_PORT=465
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    ULTIMATE_ADMIN_EMAIL=admin@example.com
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

## Usage
  - Access the API
    - The API will be running at http://localhost:3000 or you can access at https://blogapi-jqur.onrender.com without cloning whole project.
    - Use tools like Postman or Swagger UI to test the endpoints.

---

## API Endpoints

### Auth route

- `POST /api/user/login` — Login
- `POST /api/user/logout` — Logout

### Users route

- `POST /api/signup` — Register user (with profile picture)
- `GET /api/user/:id` — Get user details (auth required)
- `GET /api/users` — Get all users (admin only)
- `PUT /api/user/edit/:id` — Update user (auth required)
- `DELETE /api/user/delete/:id` — Delete user (auth required or admin)

### OTP route

- `POST /api/otp/verify-otp/:userId` — Verify OTP
- `POST /api/otp/resend-otp/:userId` — Resend OTP

### Password Reset

- `POST /api/password/resetRequest` — Request password reset
- `POST /api/password/reset` — Reset password

### Posts

- `POST /api/blog/create/:id` — Create post
- `GET /api/blogs` — Get all posts
- `GET /api/blogs/:id` — Get posts by user (auth required)
- `PUT /api/blog/update/:id` — Update post (auth required)
- `DELETE /api/blog/delete/:id` — Delete post (auth or admin)

### Comments

- `POST /api/comment/create/:postId` — Create comment (auth required)
- `GET /api/comments/:id` — Get comments for a post (auth required)
- `PUT /api/comment/edit/:id` — Edit comment (auth required)
- `DELETE /api/comment/delete/:id` — Delete comment (auth or admin)

### Profile Picture

- `POST /api/uploadImage/:id` — Upload profile picture (auth required)
- `PUT /api/updateImage/:id` — Update profile picture (auth required)
- `DELETE /api/deleteImage/:id` — Delete profile picture (auth required)

