

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setMessage(' Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <a href="/add" style={{ marginBottom: '1rem', display: 'inline-block' }}>➕ Add New Task</a>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: '1rem' }}>
            <strong>{task.title}</strong> - {task.status}
            <br />
            <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
            <br />
            <a href={`/edit/${task._id}`} style={{ color: 'blue', marginRight: '10px' }}>✏️ Edit</a>
            <button
              onClick={() => handleDelete(task._id)}
              style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;

