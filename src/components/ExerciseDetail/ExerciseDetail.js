import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedExercise } from '../../store';
import './ExerciseDetail.css';

function ExerciseDetail() {
  const selectedExercise = useSelector((state) => state.exercises.selectedExercise);
  const dispatch = useDispatch();

  if (!selectedExercise) return null;

  const handleBack = () => {
    dispatch(setSelectedExercise(null));
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Низкая': return '#4CAF50';
      case 'Средняя': return '#FF9800';
      case 'Высокая': return '#f44336';
      default: return '#667eea';
    }
  };

  return (
    <section className="exercise-detail-section">
      <div className="detail-container">
        <button className="back-btn" onClick={handleBack}>
          ← Назад к списку
        </button>

        <div className="detail-card">
          <div className="detail-header">
            <h1>{selectedExercise.name}</h1>
            <div 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(selectedExercise.difficulty) }}
            >
              {selectedExercise.difficulty}
            </div>
          </div>

          <div className="detail-content">
            <div className="content-section">
              <h3>📝 Описание</h3>
              <p>{selectedExercise.description}</p>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-icon">💪</span>
                <div>
                  <p className="stat-label">Группа мышц</p>
                  <p className="stat-value">{selectedExercise.muscleGroup}</p>
                </div>
              </div>

              <div className="stat-item">
                <span className="stat-icon">🏋️</span>
                <div>
                  <p className="stat-label">Оборудование</p>
                  <p className="stat-value">{selectedExercise.equipment}</p>
                </div>
              </div>

              <div className="stat-item">
                <span className="stat-icon">🔥</span>
                <div>
                  <p className="stat-label">Калории</p>
                  <p className="stat-value">{selectedExercise.calories} ккал</p>
                </div>
              </div>
            </div>

            <div className="training-params">
              <h3>📊 Параметры тренировки</h3>
              <div className="params-grid">
                <div className="param-card">
                  <p className="param-label">Подходы</p>
                  <p className="param-value">{selectedExercise.sets}</p>
                </div>
                <div className="param-card">
                  <p className="param-label">Повторения</p>
                  <p className="param-value">{selectedExercise.reps}</p>
                </div>
                <div className="param-card">
                  <p className="param-label">Вес</p>
                  <p className="param-value">{selectedExercise.weight || 'Свой'} кг</p>
                </div>
                <div className="param-card">
                  <p className="param-label">Дата</p>
                  <p className="param-value">
                    {new Date(selectedExercise.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            </div>

            <div className="content-section tips-section">
              <h3>💡 Советы по выполнению</h3>
              <ul className="tips-list">
                {selectedExercise.tips && selectedExercise.tips.map((tip, index) => (
                  <li key={index}>
                    <span className="tip-icon">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="action-buttons">
              <button className="action-btn primary">
                ✏️ Редактировать
              </button>
              <button className="action-btn secondary">
                📊 История тренировок
              </button>
              <button className="action-btn success">
                ✓ Завершить подход
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExerciseDetail;