import React, { useState } from 'react'

const Login = () => {
    const [admin, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const urlvar = 'https://backend-astro.vercel.app';
    // https:astro-portfolio-backend.vercel.app

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${urlvar}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ admin, password }),
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            console.log(data.message);
            window.localStorage.setItem("authenticated", true);
            window.location.href = "./admin";
          } else {
            alert("Authentication failed. Please check your credentials.");
          }
        } catch (error) {
          console.error("Error logging in:", error);
          alert("Error logging in. Please try again.");
        }
      };

      
  return (
  



<div className="min-h-screen flex items-center justify-center bg-amber-500">
<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
  <div className="text-center mb-6">
    <h1 className="text-2xl font-semibold text-gray-700">Login</h1>
  </div>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Username"
        value={admin}
        onChange={(e)=> setUsername(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
    >
      Login
    </button>
  </form>
</div>
</div>
  )
}

export default Login