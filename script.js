import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Initial instructions state
const INSTRUCTIONS = {
  title: "How to Play",
  steps: [
    "Guess the meta rating of each Clash Royale card",
    "Ratings range from 1 (worst) to 10 (best)",
    "Press Enter to submit your guess",
    "Press Space to see the next card",
    "Perfect guess: 100 points",
    "Within 0.5: 75 points",
    "Within 1.0: 50 points",
    "Within 2.0: 25 points",
    "Other guesses: 10 points"
  ]
};

// Predefined cards with their meta ratings and rarity
const cards = [
  { name: 'Mega Knight', rating: 7.5, description: 'Jumping legendary that deals splash damage', rarity: 'Legendary' },
  { name: 'Skeleton Army', rating: 6.8, description: 'Army of skeletons that can overwhelm' },
  { name: 'Fireball', rating: 8.2, description: 'Classic spell that deals area damage' },
  { name: 'Pekka', rating: 7.8, description: 'Heavy single-target damage dealer' },
  { name: 'Goblin Barrel', rating: 7.9, description: 'Surprise attack with three goblins' },
  { name: 'Wizard', rating: 5.4, description: 'Ranged splash damage troop' },
  { name: 'Hog Rider', rating: 8.5, description: 'Fast building-targeting troop' },
  { name: 'Arrows', rating: 7.0, description: 'Area damage spell' },
  { name: 'Valkyrie', rating: 7.6, description: 'Ground splash damage troop' },
  { name: 'Inferno Tower', rating: 7.2, description: 'Building that melts tanks' },
];

// React App Component
const App = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);
  const [guess, setGuess] = useState('');
  const handleGuessChange = (e) => {
    const value = e.target.value;
    if (value === '' || (value >= 0 && value <= 10)) {
      setGuess(value);
    }
  };
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Select a random card
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  };

  // Start new round
  const startNewRound = () => {
    setCurrentCard(getRandomCard());
    setGuess('');
    setFeedback('');
    setShowRating(false);
  };

  // Initialize game
  useEffect(() => {
    startNewRound();
  }, []);
  
  // Add space bar listener for next card
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space' && showRating) {
        event.preventDefault();
        startNewRound();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showRating]);

  // Handle guess submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const guessNumber = parseFloat(guess);
    if (!guess || guessNumber < 1 || guessNumber > 10) {
      setFeedback('Please enter a valid number between 1 and 10');
      return;
    }

    const difference = Math.abs(currentCard.rating - guessNumber);
    let points = 0;
    let feedbackText = '';

    if (difference === 0) {
      points = 100;
      feedbackText = 'Perfect guess! +100 points!';
    } else if (difference <= 0.5) {
      points = 75;
      feedbackText = 'Very close! +75 points!';
    } else if (difference <= 1) {
      points = 50;
      feedbackText = 'Good guess! +50 points!';
    } else if (difference <= 2) {
      points = 25;
      feedbackText = 'Not bad! +25 points!';
    } else {
      points = 10;
      feedbackText = 'Keep trying! +10 points!';
    }

    setScore(score + points);
    setFeedback(feedbackText);
    setShowRating(true);
    setGamesPlayed(gamesPlayed + 1);
  };

  if (!currentCard) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: '"Segoe UI", Arial, sans-serif', textAlign: 'center' }}>
      {/* Your React component JSX here, unchanged */}
    </div>
  );
};

const container = document.getElementById('renderDiv');
const root = ReactDOM.createRoot(container);
root.render(<App />);
