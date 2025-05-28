import React, { useEffect, useState } from 'react';

interface Challenge {
  id: number;
  title: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setChallenges([
      { id: 1, title: 'Drink 8 glasses of water 💧', category: 'Health' },
      { id: 2, title: 'Stretch for 10 minutes 🧘', category: 'Health' },
      { id: 3, title: 'Plan tomorrow’s to-do list 📝', category: 'Productivity' },
      { id: 4, title: 'Clean up your workspace 🧹', category: 'Productivity' },
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
    };

    setChallenges((prev) => [...prev, newChallenge]);
    setNewTitle('');
    setNewCategory('');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    
    window.location.href = '/login';
  };

  return (
    <div style={styles.pageWrapper}>
    <div style={styles.profileWrapper}>
      <div onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.profileBubble}>
        👤
      </div>
      {dropdownOpen && (
        <div style={styles.dropdownMenu}>
          <button style={styles.dropdownItem} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome to Habit Quest</h1>

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
          <button type="submit" style={styles.button}>Add Challenge</button>
        </form>

        <div style={styles.challengeGrid}>
          {challenges.map((challenge) => (
            <div key={challenge.id} style={styles.card}>
              <h3 style={styles.challengeTitle}>{challenge.title}</h3>
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
    margin: '80px auto 40px',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
    alignItems: 'center',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    width: '80%',
    maxWidth: '400px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  challengeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  challengeTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  category: {
    fontSize: '0.9rem',
    color: '#777',
  },
};
