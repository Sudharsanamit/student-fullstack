// Part A

// Q1---------

// function App() {
//   function runQ1() {
//     fetch("http://localhost:8080/api/students/99")
//       .then(res => res.json())
//       .then(data => console.log(data.name))
//       .catch(err => console.log("Error: " + err.message));
//   }

// }
// export default App;


// fetch() does not automatically throw an error for HTTP 404.  
// we have to manualy check the response status and throw an erro



// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     fetch("http://localhost:8080/api/students/99")
//       .then(res => {
//         if (!res.ok) {
//           return res.json().then(data => {
//             throw new Error(data.error);
//           });
//         }

//         return res.json();
//       })
//       .then(data => console.log(data.name))
//       .catch(err => console.log("Error: " + err.message));
//   }, []);
// }

// export default App;

//Q2-

// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     fetch("http://localhost:8080/api/students", {
//       method: "POST",
//       body: {
//         name: "sudharsanam",
//         email: "sudharsanam@gmail.com",
//         department: "IT",
//         marks: 85
//       }
//     });
//   }, []);
// }

// export default App;

// JSON.stringify() -not used it coverts js object into json 
// Content-Type - tell what conntent - json
//responce exception


// fix

// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     fetch("http://localhost:8080/api/students", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: "sudharsanam",
//         email: "sudharsanam@gmail.com",
//         department: "IT",
//         marks: 85
//       })
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error("Failed to save student: " + res.status);
//         }
//         return res.json();
//       })
//       .then(data => console.log(data))
//       .catch(err => console.log("Error: " + err.message));
//   }, []);
// }

// export default App;


// Q3

// import { useState, useEffect } from "react";
// import axios from "axios";

// function StudentList() {
//   const [students, setStudents] = useState();

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/students")
//       .then(res => setStudents(res.data));
//   });

//   return (
//     <div>
//       {students.map(s => (
//         <p>{s.name}</p>
//       ))}
//     </div>
//   );
// }

// export default StudentList;

// Missing useEffect dependency array causes repeated API requests after each render.
//  Missing key prop for each student element.
//No catch() to handle API request failures.

//fix
// import { useState, useEffect } from "react";
// import axios from "axios";

// function StudentList() {
//   const [students, setStudents] = useState([]);

// useEffect(() => {
//   axios.get("http://localhost:8080/api/students")
//     .then(res => {
//       console.log(res.data);
//       setStudents(res.data);
//     })
//     .catch(err => console.log("Error: " + err.message));
// }, []);

// }

// export default StudentList;



//Q4

// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [students, setStudents] = useState([]);

//   async function loadStudents() {
//     try {
//       const res = await axios.get("/api/students");
//       setStudents(res.data);
//     } catch (err) {
//       console.log(err.response.status);
//     }
//   }

//   loadStudents();

//   return null;
// }

// export default App;

// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [students, setStudents] = useState([]);

//   async function loadStudents() {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/students"
//       );
//       setStudents(res.data);
//       console.log(res.data);
//     } catch (err) {
//       console.log(
//         err.response? err.response.status: err.message
//       );
//     }
//   }

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   return null;
// }

// export default App;


// Q5

// git init
// git remote add origin https://github.com/rani/student-app.git
// git add .
// git push -u origin main

// create branch main
// and commit the changes after add .

// git init
// git branch -M main
// git remote add origin https://github.com/sudharsanamit/student-app.git
// git add .
// git commit -m "Initial commit"
// git push -u origin main


// Q6

// # .gitignore
// node_modules
// target
// application.properties

// after committed it not automatically remove after  add in .gitignore we do it manaully
// remove the file from git tracking 
// add or change the password and recommit


// git rm --cached src/main/resources/application.properties
// git add .gitignore
// git commit -m "Stop tracking application properties"
// git push

