# Memory Vault Frontend

This is the frontend for the Memory Vault MERN application, built with Vite, React, Tailwind CSS, and Framer Motion.

## Setup

1.  **Install Dependencies**:
    ```bash
    cd frontend
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file in the `frontend` directory (optional if hardcoded, but recommended):
    ```
    VITE_API_URL=http://localhost:5000/api
    ```
    *Note: The API URL is currently set to `http://localhost:5000/api` in `src/context/AuthContext.tsx`. Update it there or use environment variables for production.*

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Features

-   **Authentication**: Login and Register with JWT.
-   **Dashboard**: Animated grid view of memories.
-   **Create Memory**: Drag & Drop file upload, preview, and details form.
-   **Memory Detail**: Full view of memory media and details.
-   **Profile**: User stats and info.
-   **UI**: Dark futuristic theme with Glassmorphism and Neon effects.

## Technologies

-   React (Vite)
-   TypeScript
-   Tailwind CSS
-   Framer Motion
-   Axios
-   React Router DOM
-   React Toastify
-   React Dropzone
