import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExercise, updateExercise } from '../../store';
import './AddExerciseModal.css';

function AddExerciseModal({ onClose, exercise }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(exercise || {
    name: '',
    muscleGroup: 'Грудь',
    sets: 3,
    reps: 10,
    weight: 0,
    date: new Date().toISOString().split('T')[0],
    calories: 100
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (exercise) {
      dispatch(updateExercise({ ...formData, id: exercise.id }));
    } else {
      dispatch(addExercise(formData));
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sets' || name === 'reps' || name === 'weight' || name === 'calories'
        ? Number(value)
        : value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{exercise ? 'Редактировать упражнение' : 'Добавить упражнение'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="exercise-form">
          <div className="form-group">
            <label>Название упражнения</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Жим лёжа"
              required
            />
          </div>

          <div className="form-group">
            <label>Группа мышц</label>
            <select
              name="muscleGroup"
              value={formData.muscleGroup}
              onChange={handleChange}
              required
            >
              <option value="Грудь">Грудь</option>
              <option value="Спина">Спина</option>
              <option value="Ноги">Ноги</option>
              <option value="Плечи">Плечи</option>
              <option value="Руки">Руки</option>
              <option value="Пресс">Пресс</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Подходы</label>
              <input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>

            <div className="form-group">
              <label>Повторения</label>
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Вес (кг)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                max="500"
              />
            </div>

            <div className="form-group">
              <label>Калории</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                min="0"
                max="1000"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Дата</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-submit">
              {exercise ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExerciseModal;