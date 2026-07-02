# Product Review API

A REST API for product reviews built with Node.js, Express.js, MongoDB and JWT authentication.

## Features
- User registration and login
- Full CRUD for products
- Add and view reviews for products
- Protected routes for authenticated users

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /auth/register            - Register a user
- POST   /auth/login               - Login a user
- GET    /products                 - Get all products
- GET    /products/:id             - Get a product by ID
- POST   /products                 - Create a product (protected)
- PUT    /products/:id             - Update a product (protected)
- DELETE /products/:id             - Delete a product (protected)
- POST   /products/:id/reviews     - Add a review (protected)
- GET    /products/:id/reviews     - Get reviews for a product