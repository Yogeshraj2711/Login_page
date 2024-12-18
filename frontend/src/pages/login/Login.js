import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate=useNavigate
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [message, setmessage] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await responce.json();
      if (responce.ok) {
        setmessage("Login successful!");
        localStorage.setItem("token", data.token);
        navigate('/dashboard')
      } else {
        // Login failed
        setmessage(data.message || "Login failed");
      }
    } catch (err) {
      setmessage("An error occurred. Please try again.");
    }
  };
  return (
    <div>
      
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="enter the username"
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="enter the password"
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
};
