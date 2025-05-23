import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: taskInput.trim(),
    };

    setTasks([newTask, ...tasks]);
    setTaskInput('');
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '600px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2rem',
    },
    form: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    taskList: {
      listStyle: 'none',
      padding: 0,
    },
    taskItem: {
      background: '#f4f4f4',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    deleteBtn: {
      background: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your Daily Tasks</h1>

      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add
        </button>
      </form>

      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <span>{task.text}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
