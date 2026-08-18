export const STATIC_POSTS_API_URL =
  "https://jsonplaceholder.typicode.com/posts";
export const POSTS_PER_PAGE = 12;

// Render
// export const BASE_URL = "https://intern-api-ew1g.onrender.com";

// localhost
// export const BASE_URL = "http://localhost:3000";

// aws
// export const BASE_URL = "/api";

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:3000" : "/api";

export const api_status = {
  loading: "LOADING",
  success: "SUCCESS",
  failed: "FAILED",
};
