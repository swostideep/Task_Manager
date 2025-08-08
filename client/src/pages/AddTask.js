import React, { useState } from 'react';
import axios from 'axios';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://taskmanager-backend-9ai0.onrender.com/api/tasks',
        { title, description, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Task added successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add task');
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        /><br />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        /><br />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        /><br />

        <button type="submit">Add Task</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddTask;


