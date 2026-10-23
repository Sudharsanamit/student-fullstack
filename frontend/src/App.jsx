
//q15

// import { useEffect } from "react";
// import { deleteStudent, getStudents } from "./api";

// function App() {
//   useEffect(() => {
//     async function test() {
//       console.log(await deleteStudent(99));

//       // Stop Spring Boot before this call
//       console.log(await getStudents());
//     }

//     test();
//   }, []);

//   return null;
// }

// export default App;

//16

// import { useEffect } from "react";

// async function getJson(url) {
//   const res = await fetch(url);

//   if (!res.ok) {
//     let message;

//     try {
//       const data = await res.json();
//       message = data.error || JSON.stringify(data);
//     } catch {
//       message = await res.text();
//     }
//     throw new Error(`HTTP ${res.status}: ${message}`);
//   }
//   return res.json();
// }
// function getStudent(id) {
//   return getJson(`http://localhost:8080/api/students/${id}`);
// }
// function App() {
//   useEffect(() => {
//     getStudent(99).catch(e => console.log(e.message));
//   }, []);

//   return null;
// }

// export default App;


//q17


import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const emptyForm = {
  name: "",
  email: "",
  department: "",
  marks: ""
};

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    const timer = setTimeout(() => {
      const request = search.trim()
        ? api.get("/api/students/search", {
            params: { name: search.trim() }
          })
        : api.get("/api/students");

      request
        .then(res => {
          if (active) {
            setStudents(res.data);
            setError("");
          }
        })
        .catch(() => {
          if (active) {
            setError("Server is not reachable");
            setStudents([]);
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setFormError("");
  }

  async function handleAdd(e) {
    e.preventDefault();
    setFieldErrors({});
    setFormError("");

    try {
      const res = await api.post("/api/students", {
        ...form,
        marks: Number(form.marks)
      });

      const student = res.data;

      setStudents(current => {
        if (
          search.trim() &&
          !student.name.toLowerCase().includes(search.trim().toLowerCase())
        ) {
          return current;
        }

        return [student, ...current.filter(s => s.id !== student.id)];
      });

      setForm(emptyForm);
    } catch (err) {
      if (!err.response) {
        setFormError("Server is not reachable");
      } else if (err.response.status === 400) {
        const data = err.response.data;
        const errors = data.errors || data.fieldErrors || data;
        const fields = ["name", "email", "department", "marks"];
        const nextErrors = {};

        fields.forEach(field => {
          if (errors[field]) {
            nextErrors[field] = Array.isArray(errors[field])
              ? errors[field].join(", ")
              : errors[field];
          }
        });

        setFieldErrors(nextErrors);

        if (data.error && Object.keys(nextErrors).length === 0) {
          setFormError(data.error);
        }
      } else {
        setFormError(
          err.response.data?.error || "Failed to add student"
        );
      }
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await api.delete(`/api/students/${id}`);
      setStudents(current => current.filter(student => student.id !== id));
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to delete student"
      );
    }
  }

  return (
    <div>
      <h2>Students</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <h3>Add Student</h3>

      <form onSubmit={handleAdd}>
        {["name", "email", "department", "marks"].map(field => (
          <div key={field}>
            <input
              name={field}
              type={field === "marks" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
            />

            {fieldErrors[field] && (
              <p style={{ color: "red" }}>{fieldErrors[field]}</p>
            )}
          </div>
        ))}

        {formError && <p style={{ color: "red" }}>{formError}</p>}

        <button type="submit">Add Student</button>
      </form>

      <h3>Student List</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.marks}</td>
                <td>
                  <button onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;




