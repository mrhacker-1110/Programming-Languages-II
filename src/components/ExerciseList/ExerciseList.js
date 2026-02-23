import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExercises, deleteExercise, setFilter, setSelectedExercise } from '../../store';
import AddExerciseModal from '../AddExerciseModal/AddExerciseModal';
import ExerciseDetail from '../ExerciseDetail/ExerciseDetail';
import './ExerciseList.css';

function ExerciseList() {
  const { exercises, filter, loading, error, selectedExercise } = useSelector((state) => state.exercises);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const muscleGroups = ['Все', 'Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки', 'Пресс'];

  const filteredExercises = filter === 'Все' 
    ? exercises 
    : exercises.filter(ex => ex.muscleGroup === filter);

  const handleDelete = (id) => {
    if (window.confirm('Удалить это упражнение?')) {
      dispatch(deleteExercise(id));
    }
  };

  const handleEdit = (exercise) => {
    setEditingExercise(exercise);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingExercise(null);
    setIsModalOpen(true);
  };

  const handleViewDetail = (exercise) => {
    dispatch(setSelectedExercise(exercise));
  };

  const getMuscleIcon = (muscleGroup) => {
    const icons = {
      'Грудь': '💪',
      'Спина': '🏋️',
      'Ноги': '🦵',
      'Плечи': '🤸',
      'Руки': '💪',
      'Пресс': '🔥'
    };
    return icons[muscleGroup] || '⚡';
  };

  if (loading) {
    return (
      <section id="exercises" className="exercises-section">
        <div className="exercises-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <h2>Загрузка упражнений...</h2>
            <p>Пожалуйста, подождите</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="exercises" className="exercises-section">
        <div className="exercises-container">
          <div className="error-container">
            <h2>❌ Ошибка загрузки</h2>
            <p>{error}</p>
            <button onClick={() => dispatch(fetchExercises())} className="retry-btn">
              Попробовать снова
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Показываем детальный вид если упражнение выбрано
  if (selectedExercise) {
    return <ExerciseDetail />;
  }

  return (
    <section id="exercises" className="exercises-section">
      <div className="exercises-container">
        <div className="section-header">
          <h1>Мои тренировки</h1>
          <p>Отслеживай свой прогресс в зале • Данные загружены из JSON</p>
        </div>

        <div className="filter-bar">
          <div className="filters">
            {muscleGroups.map(group => (
              <button
                key={group}
                className={`filter-btn ${filter === group ? 'active' : ''}`}
                onClick={() => dispatch(setFilter(group))}
              >
                {group}
              </button>
            ))}
          </div>
          <button className="add-exercise-btn" onClick={handleAddNew}>
            <span>+</span> Добавить упражнение
          </button>
        </div>

        <div className="exercises-stats">
          <div className="stat-card">
            <h3>{filteredExercises.length}</h3>
            <p>Упражнений</p>
          </div>
          <div className="stat-card">
            <h3>{filteredExercises.reduce((sum, ex) => sum + ex.sets * ex.reps, 0)}</h3>
            <p>Всего повторений</p>
          </div>
          <div className="stat-card">
            <h3>{filteredExercises.reduce((sum, ex) => sum + ex.calories, 0)}</h3>
            <p>Калорий сожжено</p>
          </div>
        </div>

        <div className="exercises-grid">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <div className="exercise-header">
                <div className="exercise-icon">
                  {getMuscleIcon(exercise.muscleGroup)}
                </div>
                <div className="exercise-badge">{exercise.muscleGroup}</div>
              </div>
              
              <h3>{exercise.name}</h3>
              
              <div className="exercise-details">
                <div className="detail-item">
                  <span className="detail-label">Подходы</span>
                  <span className="detail-value">{exercise.sets}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Повторения</span>
                  <span className="detail-value">{exercise.reps}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Вес (кг)</span>
                  <span className="detail-value">{exercise.weight || 'Свой вес'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Калории</span>
                  <span className="detail-value">{exercise.calories} ккал</span>
                </div>
              </div>

              <div className="exercise-date">
                📅 {new Date(exercise.date).toLocaleDateString('ru-RU')}
              </div>

              <div className="exercise-actions">
                <button className="btn-view" onClick={() => handleViewDetail(exercise)}>
                  👁️ Подробнее
                </button>
                <button className="btn-edit" onClick={() => handleEdit(exercise)}>
                  ✏️
                </button>
                <button className="btn-delete" onClick={() => handleDelete(exercise.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="empty-state">
            <h2>😔 Упражнений не найдено</h2>
            <p>Добавьте первое упражнение, чтобы начать отслеживать прогресс</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddExerciseModal 
          onClose={() => setIsModalOpen(false)}
          exercise={editingExercise}
        />
      )}
    </section>
  );
}

export default ExerciseList;