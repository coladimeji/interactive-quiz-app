import React from 'react';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

const App = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen py-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Quiz Master</h1>
      <Quiz />
      <Leaderboard />
    </div>
  );
};

export default App;