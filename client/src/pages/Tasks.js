
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState(''); 

  const token = localStorage.getItem('token');


  const fetchTasks = async () => {
    try {
      const url = filter
        ? `http://localhost:5000/api/tasks?status=${filter}`
        : `http://localhost:5000/api/tasks`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to fetch tasks');
    }
  };


  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(" Task added!");
      setTitle('');
      setDescription('');
      setDueDate('');
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add task');
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setMessage('Failed to delete task');
    }
  };


  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      setMessage(' Failed to update status');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]); 

  return (
    <div>
      <h2>My Tasks</h2>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      
      <form onSubmit={handleAddTask} style={{ marginBottom: '1rem' }}>
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

      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: '1rem' }}>
            <strong>{task.title}</strong> - {task.status}
            <br />
            <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
            <br />
            <button
              onClick={() => handleToggleStatus(task._id, task.status)}
              style={{
                backgroundColor: task.status === 'completed' ? 'orange' : 'green',
                color: 'white',
                marginRight: '10px',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
            </button>
            <a
              href={`/edit/${task._id}`}
              style={{ color: 'blue', marginRight: '10px' }}
            >
              Edit
            </a>
            <button
              onClick={() => handleDelete(task._id)}
              style={{
                color: 'white',
                backgroundColor: 'red',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
               Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
