import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Challenge {
  id: number;
  title: string;
  category: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    setChallenges([
      { id: 1, title: 'Drink 8 glasses of water 💧', category: 'Health', completed: false },
      { id: 2, title: 'Stretch for 10 minutes 🧘', category: 'Health', completed: true },
      { id: 3, title: 'Plan tomorrow’s to-do list 📝', category: 'Productivity', completed: false },
    ]);
  }, []);

  const handleAddChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === '' || newCategory.trim() === '') {
      alert('Please fill out both fields.');
      return;
    }

    const newChallenge: Challenge = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      completed: false,
    };

    setChallenges((prev) => [...prev, newChallenge]);
    setNewTitle('');
    setNewCategory('');
  };

  const handleToggleComplete = (id: number) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const clearCompleted = () => {
    setChallenges((prev) => prev.filter((c) => !c.completed));
  };

  const handleLogout = () => {
    // Clear auth tokens or user state here if needed
    navigate('/login');
  };

  const filteredChallenges = showCompleted
    ? challenges
    : challenges.filter((c) => !c.completed);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.profileWrapper}>
        <div onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.profileBubble}>
          👤
        </div>
        {dropdownOpen && (
          <div style={styles.dropdownMenu}>
            <button style={styles.dropdownItem} onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}> Habit Quest</h1>

        <form onSubmit={handleAddChallenge} style={styles.form}>
          <input
            type="text"
            placeholder="Challenge title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Category (e.g., Health, Mind)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={styles.input}
          />
          <div style={styles.buttonRow}>
            <button type="submit" style={styles.button}>Add Challenge</button>
            {challenges.some(c => c.completed) && (
              <button type="button" onClick={clearCompleted} style={styles.clearBtn}>
                Clear Completed
              </button>
            )}
          </div>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            Show Completed
          </label>
        </form>

        <div style={styles.challengeGrid}>
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              style={{
                ...styles.card,
                backgroundColor: challenge.completed ? '#ffe6f0' : '#e0f7fa',
                borderColor: challenge.completed ? '#e91e63' : '#00bcd4',
                opacity: challenge.completed ? 0.7 : 1,
                textDecoration: challenge.completed ? 'line-through' : 'none',
              }}
              onClick={() => handleToggleComplete(challenge.id)}
              title="Click to mark as complete"
            >
              <h3 style={styles.challengeTitle}>
                {challenge.completed ? '✅ ' : '🔸 '}{challenge.title}
              </h3>
              <p style={styles.category}>{challenge.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const styles: { [key: string]: React.CSSProperties } = {
 pageWrapper: {
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: '#f0f4f8', // soft light blue-gray
  padding: '2rem',
  boxSizing: 'border-box',
},

  profileWrapper: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  },
  profileBubble: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#0077cc',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
  dropdownMenu: {
    marginTop: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    padding: '0.5rem',
  },
  dropdownItem: {
    padding: '0.5rem 1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'left',
  },
  container: {
    maxWidth: '800px',
    margin: '100px auto 40px',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
  },
  title: {
  fontSize: '2.6rem',
  marginBottom: '2rem',
  color: '#003366', // dark blue
  fontWeight: 700,
  textAlign: 'center',
  letterSpacing: '1px',
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
},

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
    alignItems: 'center',
  },
  input: {
    padding: '0.7rem',
    fontSize: '1rem',
    width: '90%',
    maxWidth: '350px',
    borderRadius: '8px',
    border: '2px solid #ddd',
    backgroundColor: '#f7f9fa',
  },
  buttonRow: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    backgroundColor: '#00bcd4',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  clearBtn: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    backgroundColor: '#e91e63',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '0.95rem',
    marginTop: '0.5rem',
    color: '#555',
  },
  challengeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.2rem',
    marginTop: '1rem',
  },
  card: {
    border: '2px dashed',
    borderRadius: '12px',
    padding: '0.8rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
  },
  challengeTitle: {
    fontSize: '1.1rem',
    fontWeight: 500,
    marginBottom: '0.3rem',
    color: '#333',
  },
  category: {
    fontSize: '0.85rem',
    color: '#666',
  },
};