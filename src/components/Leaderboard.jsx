import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Leaderboard = () => {
  const chartRef = useRef(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = localStorage.getItem('quizScores');
    if (storedScores) {
      setScores(JSON.parse(storedScores).sort((a, b) => b.score - a.score).slice(0, 5)); // Get top 5 scores
    }
  }, []);

  useEffect(() => {
    if (scores.length > 0 && chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: scores.map(score => score.name),
          datasets: [{
            label: 'Score',
            data: scores.map(score => score.score),
            backgroundColor: 'rgba(102, 160, 255, 0.8)', // Example color
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Score'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Player'
              }
            }
          },
          plugins: {
            legend: {
              display: false, // Hide the legend
            },
            title: {
              display: true,
              text: 'Top Scores',
              font: {
                size: 16
              }
            }
          }
        },
      });
    }
  }, [scores]);

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-purple-600">🏆 Leaderboard</h2>
      {scores.length > 0 ? (
        <canvas ref={chartRef} aria-label="Leaderboard chart"></canvas>
      ) : (
        <p>No scores yet. Take the quiz and get on the board!</p>
      )}
    </div>
  );
};

export default Leaderboard;