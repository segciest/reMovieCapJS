import axios from "axios";
export const http = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api", // url
  headers: {
    // ở header là nơi truyền token CyberSoft
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDIiLCJIZXRIYW5TdHJpbmciOiIwNy8xMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MzM1Mjk2MDAwMDAiLCJuYmYiOjE3MTUxMDEyMDAsImV4cCI6MTczMzY3NzIwMH0.eRjDGZmIzPZGC0Mf03m9BN2p0gTqsUjw8zEfQtBd_bQ",
    token: localStorage.getItem(""),
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDIiLCJIZXRIYW5TdHJpbmciOiIwNy8xMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MzM1Mjk2MDAwMDAiLCJuYmYiOjE3MTUxMDEyMDAsImV4cCI6MTczMzY3NzIwMH0.eRjDGZmIzPZGC0Mf03m9BN2p0gTqsUjw8zEfQtBd_bQ",
  },
  timeout: 30000,
});
