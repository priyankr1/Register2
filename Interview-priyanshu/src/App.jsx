import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/register', {
        name,
        email,
        password,
      });
      toast.success(res.data.message);
      localStorage.setItem('token', res.data.token)
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || err.response.data.error || 'Something went wrong');
      } else {
        toast.error('Failed to connect to server');
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h1 className="text-blue-600 text-3xl font-bold mb-6 text-center">
          Register User
        </h1>

        <input
          className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name={name}
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name={email}
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name={password}
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
