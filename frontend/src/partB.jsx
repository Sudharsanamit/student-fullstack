// part B


// Q7
// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     console.log("A");

//     fetch("http://localhost:8080/api/students")
//       .then(() => console.log("B"));

//     setTimeout(() => console.log("C"), 0);
  
//     Promise.resolve().then(() => console.log("D"));

//     console.log("E");
//   }, []);

//   return null;
// }

// export default App;

// output:
// A
// E
// D
// B
// C

// A and E print synchronously first.
// D runs as a Promise microtask.
// C runs as a timer callback.
// B runs when the fetch request completes successfully


// Q7

// import { useEffect } from "react";

// function App() {
//   useEffect(() => {

//     async function f() {
//       console.log("1");
//       await null;
//       console.log("2");
//     }

//     console.log("3");
//     f();
//     console.log("4");
//   }, []);

//   return null;
// }

// export default App;

// ouptput:
// 3 prints first, before calling f().
// 1 prints when f() starts.
// await waits for the next microtask, so 4 prints
// 2 prints last, when f() resumes after await.



//q9

// import { useEffect } from "react";
// import axios from "axios";

// function App() {
//   useEffect(() => {
//     try {
//       //await axios.get("http://localhost:8080/api/students/99");
//    axios.get("http://localhost:8080/api/students/99");
//   console.log("OK");
// } catch (err) {
//   console.log(err.response.status);
//   console.log(err.response.data.error);
// }
// console.log("Done");
//   }, []);

//   return null;
// }

// export default App;


//output;
// ok
// Donr
// 404error
//here axious is asynchronos but await stops the process it gives 500 inter server error
// without await code runs Ok Done and the respoce after that 



//q10

// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     fetch("http://localhost:8080/api/students/99")
//       .then(res => {
//         console.log(res.ok);
//         console.log(res.status);
//         return res.json();
//       })
//       .then(data => {
//         console.log(data.error);
//       });
//   }, []);

//   return null;
// }

// export default App;


// output:
// false — res.ok-server 404 errro
// 404 — res.status prints the HTTP status code.
// Student not found with id 99 — res.json() reade error message



//q11

// import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   function add() {
//     setCount(count + 1);
//     setCount(count + 1);
//     setCount(c => c + 1);
//     console.log(count);
//   }

//   return (
//     <>
//       <p>{count}</p>
//       <button onClick={add}>Add</button>
//     </>
//   );
// }

// export default App;


// ouput:
// 0 2 4 6 ..
// useState - it updates the valur the button click



// q12

// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     const s = {
//       name: "Sanakr",
//       marks: 85,
//       address: undefined,
//       tags: ["a", "b"]
//     };

//     console.log(JSON.stringify(s));
//     console.log(JSON.parse('{"x":1,"y":[2,3]}').y.length);
//     console.log(typeof JSON.parse("42"));
//   }, []);

//   return null;
// }

// export default App;

// output:

// {"name":"Sanakr","marks":85,"tags":["a","b"]}
// 2
// number

// JSON.stringify(s) converts the object to JSON text
//2 - y.length is 2 because the array has two elements.
//number - 42 type printed



// q13

// 13. Does the second commit succeed? What do the last two commands print?
// git init
// echo "v1" > a.txt
// git add a.txt
// git commit -m "first"
// echo "v2" >> a.txt
// git commit -m "second"
// git status --short
// git log --oneline | wc -l

// no secound commit is not added - git add . - is notgiven afetr that 

// git status - show current staus what are the files are added
// git log --oneline | wc -l - show the number of commits in the repo


//q14

// 14. The branch main has only a.txt at the start. What do the two ls commands print, and what type
// of merge happens?
// git checkout -b feature
// echo "login" > login.txt
// git add login.txt
// git commit -m "add login"
// git checkout main
// ls
// git merge feature
// ls

// first ls - a.txt  - it is in main branch
// login.txt created in feature branch 
// second ls - a.txt login.txt it is now merged

