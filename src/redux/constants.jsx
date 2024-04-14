// export const BASE_URL = process.env.VITE_REACT_APP_BACKEND_URL;
export const BASE_URL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL || "https://localhost:5000";

export const USERS_URL = `/api/users`;

export const FACE_RECOGNITION_URL = `/api/facerecognition`;
