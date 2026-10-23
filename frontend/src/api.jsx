import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

async function handleRequest(request) {
  try {
    const response = await request;
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    }
    return "Server is not reachable";
  }
}




export function getStudents() {
  return handleRequest(api.get("/api/students"));
}

export function addStudent(student) {
  return handleRequest(api.post("/api/students", student));
}

export function deleteStudent(id) {
  return handleRequest(api.delete(`/api/students/${id}`));
}

