import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaTrophy, FaDoorOpen, FaUsers } from 'react-icons/fa';
import quizData from '../data/questions';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false); // New state for toggling leaderboard
  const [leaderboardScores, setLeaderboardScores] = useState([]);

  useEffect(() => {
    const shuffledQuestions = [...quizData].sort(() => 0.5 - Math.random());
    setQuestions(shuffledQuestions.slice(0, 15));
    setLoading(false);
     const storedScores = localStorage.getItem('quizScores');
        if (storedScores) {
            setLeaderboardScores(JSON.parse(storedScores));
        }
  }, []);

    useEffect(() => {
        // Sort and update leaderboard scores whenever showResult changes
        if (showResult) {
            const storedScores = localStorage.getItem('quizScores');
            const updatedScores = storedScores ? JSON.parse(storedScores) : [];
             updatedScores.sort((a, b) => b.score - a.score);
            setLeaderboardScores(updatedScores);
            localStorage.setItem('quizScores', JSON.stringify(updatedScores));
        }
    }, [showResult]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setIsNameSubmitted(true);
    }
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setUserScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer.');
      return;
    }

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResult(true);
      const storedScores = localStorage.getItem('quizScores');
      const updatedScores = storedScores ? JSON.parse(storedScores) : [];
      updatedScores.push({ name: playerName, score });
      localStorage.setItem('quizScores', JSON.stringify(updatedScores));
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsNameSubmitted(false);
    setPlayerName('');
    const shuffledQuestions = [...quizData].sort(() => 0.5 - Math.random());
    setQuestions(shuffledQuestions.slice(0, 15));
    setLoading(false);
    setError(null);
    setUserScore(0);
    setShowLeaderboard(false);
  };

  const handleExitQuiz = () => {
    alert(`Exiting Quiz. Your final score is ${userScore}/${questions.length}.`);
    handleRestartQuiz();
  };

    const toggleLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <DynamicSvg src="loading" className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-50 p-8 rounded-lg shadow-2xl w-full max-w-2xl">
      {!isNameSubmitted ? (
        <div className="flex flex-col items-center justify-center">
          <form onSubmit={handleNameSubmit} className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 text-blue-800"
            >
              Enter your name:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Start Quiz
            </button>
          </form>
        </div>
      ) : showResult ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6 text-purple-700">
            <FaTrophy className="inline-block mr-2" />
            Quiz Result
          </h2>
          <p className="mb-4 text-lg text-gray-800">
            Your final score is:{' '}
            <span className="font-bold text-indigo-600">{score}</span> out of{' '}
            {questions.length}
          </p>
          {score === questions.length && (
            <p className="text-md text-green-600 italic">
              Perfect score! 🎉 Congratulations, {playerName}!
            </p>
          )}
          <div className='flex justify-center'>
            <button
                onClick={handleRestartQuiz}
                className="mt-8 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mr-4"
            >
                Restart Quiz
            </button>
             <button
                onClick={toggleLeaderboard}
                className="mt-8 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                <FaUsers className="mr-2" />
                {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
            </button>
          </div>
        </div>
      ) : questions.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <span className="text-xl font-bold text-blue-700">
              Score: {userScore}
            </span>
            <button
              onClick={handleExitQuiz}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              <FaDoorOpen className="mr-2" />
              Exit
            </button>
          </div>
          <p
            className="mb-6 text-lg text-gray-700"
            dangerouslySetInnerHTML={{
              __html: questions[currentQuestionIndex].question,
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestionIndex].options.map((option, index) => {
              const isCorrect =
                selectedAnswer !== null &&
                selectedAnswer ===
                  questions[currentQuestionIndex].correctAnswer &&
                selectedAnswer === option;
              const isIncorrect =
                selectedAnswer !== null &&
                selectedAnswer !==
                  questions[currentQuestionIndex].correctAnswer &&
                selectedAnswer === option;

              return (
                <button
                  key={index}
                  className={`p-4 rounded-full border ${
                    isCorrect
                      ? 'border-green-500 bg-gradient-to-r from-green-100 to-green-50 text-green-700 animate-pulse'
                      : isIncorrect
                      ? 'border-red-500 bg-gradient-to-r from-red-100 to-red-50 text-red-700 animate-shake'
                      : 'border-gray-300 bg-gradient-to-r from-gray-50 to-white text-gray-700 hover:from-blue-50 hover:to-white hover:border-blue-300'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 transition duration-300 ease-in-out shadow-md`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  <span dangerouslySetInnerHTML={{ __html: option }} />
                  {selectedAnswer === option &&
                    (isCorrect ? (
                      <FaCheck className="inline-block ml-2 text-green-500" />
                    ) : (
                      <FaTimes className="inline-block ml-2 text-red-500" />
                    ))}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleNextQuestion}
            className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            disabled={selectedAnswer === null}
          >
            {currentQuestionIndex === questions.length - 1
              ? 'Finish Quiz'
              : 'Next Question'}
          </button>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No questions available.</p>
      )}
       {showLeaderboard && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
                        <FaUsers className="inline-block mr-2" />
                        Leaderboard
                    </h2>
                    {leaderboardScores.length > 0 ? (
                        <ol className="list-decimal list-inside">
                            {leaderboardScores.map((entry, index) => (
                                <li
                                    key={index}
                                    className="py-2 border-b border-gray-200 last:border-none"
                                >
                                    <span className="font-semibold text-gray-800">
                                        {entry.name}
                                    </span>
                                    : <span className="text-blue-600">
                                        {entry.score} / {questions.length}
                                      </span>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-gray-500 text-center">No scores available yet.</p>
                    )}
                </div>
            )}
    </div>
  );
};

export default Quiz;
