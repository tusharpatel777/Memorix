# Memory Vault Backend

This is the backend for the Memory Vault MERN application.

## Setup

1.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    ```

2.  **Environment Variables**:
    Ensure you have a `.env` file in the `backend` directory with the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

3.  **Run Server**:
    ```bash
    npm start
    ```
    Or for development with auto-reload:
    ```bash
    npm run server
    ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Memories
- `GET /api/memories` - Get all memories
- `POST /api/memories` - Create a memory (multipart/form-data)
- `GET /api/memories/:id` - Get single memory
- `PUT /api/memories/:id` - Update memory
- `DELETE /api/memories/:id` - Delete memory
- `PATCH /api/memories/:id/favorite` - Toggle favorite
