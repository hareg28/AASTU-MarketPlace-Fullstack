import React, { useState } from "react";

export const Test = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/FormTest.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
