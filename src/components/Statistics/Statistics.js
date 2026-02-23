import React from 'react';
import { useSelector } from 'react-redux';
import './Statistics.css';

function Statistics() {
  const exercises = useSelector((state) => state.exercises.exercises);

  const totalExercises = exercises.length;
  const totalCalories = exercises.reduce((sum, ex) => sum + ex.calories, 0);
  const totalReps = exercises.reduce((sum, ex) => sum + (ex.sets * ex.reps), 0);
  const avgWeight = exercises.length > 0 
    ? Math.round(exercises.reduce((sum, ex) => sum + ex.weight, 0) / exercises.length)
    : 0;

  const muscleGroupStats = exercises.reduce((acc, ex) => {
    acc[ex.muscleGroup] = (acc[ex.muscleGroup] || 0) + 1;
    return acc;
  }, {});

  const topMuscleGroups = Object.entries(muscleGroupStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <section id="statistics" className="statistics-section">
      <div className="statistics-container">
        <h2>📊 Статистика тренировок</h2>
        
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon">🏋️</div>
            <h3>{totalExercises}</h3>
            <p>Всего упражнений</p>
          </div>

          <div className="stat-box">
            <div className="stat-icon">🔥</div>
            <h3>{totalCalories}</h3>
            <p>Калорий сожжено</p>
          </div>

          <div className="stat-box">
            <div className="stat-icon">💪</div>
            <h3>{totalReps}</h3>
            <p>Всего повторений</p>
          </div>

          <div className="stat-box">
            <div className="stat-icon">⚖️</div>
            <h3>{avgWeight} кг</h3>
            <p>Средний вес</p>
          </div>
        </div>

        <div className="muscle-groups-stats">
          <h3>Топ групп мышц</h3>
          <div className="muscle-bars">
            {topMuscleGroups.map(([group, count]) => (
              <div key={group} className="muscle-bar-item">
                <div className="muscle-bar-label">
                  <span>{group}</span>
                  <span>{count} упр.</span>
                </div>
                <div className="muscle-bar-track">
                  <div 
                    className="muscle-bar-fill" 
                    style={{ width: `${(count / totalExercises) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="progress-info">
          <h3>🎯 Твой прогресс</h3>
          <p>Отличная работа! Продолжай в том же духе 💪</p>
          <div className="motivational-quote">
            "Сильное тело начинается с сильного разума"
          </div>
        </div>
      </div>
    </section>
  );
}

export default Statistics;