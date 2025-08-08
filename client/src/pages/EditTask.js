import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditTask() {
  const { id } = useParams(); 
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const found = res.data.find((t) => t._id === id);
        setTask(found);
      } catch (err) {
        setMessage('Failed to load task');
      }
    };
    fetchTask();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          status: task.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(' Task updated!');
      setTimeout(() => {
        window.location.href = '/tasks';
      }, 1000);
    } catch (err) {
      setMessage(' Update failed');
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        /><br />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea><br />
        <input
          type="date"
          value={task.dueDate?.slice(0, 10)}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        /><br />
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select><br />
        <button type="submit">Update Task</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default EditTask;
