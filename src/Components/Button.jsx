// import React from "react";

// function Button() {
//   const [currentPos, setCurrentPos] = useState(null);

//   function handleButton() {
//     url = "http://localhost:5000/reportCrime";
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(currentPos),
//     })
//       .then((response) => response.json())
//       .then((currentPos) => {
//         console.log("Success:", currentPos);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }

//   return <button onSubmit={handleButton}>Report</button>;
// }

// export default Button;
