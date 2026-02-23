import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkoutPlan, updateWorkoutPlan } from '../../store';
import './AddPlanModal.css';

function AddPlanModal({ onClose, plan }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(plan || {
    title: '',
    level: 'Новичок',
    duration: '4 недели',
    daysPerWeek: 3,
    goal: '',
    image: '🏋️',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (plan) {
      dispatch(updateWorkoutPlan({ ...formData, id: plan.id }));
    } else {
      dispatch(addWorkoutPlan(formData));
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'daysPerWeek' ? Number(value) : value
    }));
  };

  const icons = ['🏋️', '💪', '🔥', '⚡', '🎯', '💯', '🏆', '⭐'];
  const levels = ['Новичок', 'Средний', 'Продвинутый'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content plan-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{plan ? 'Редактировать программу' : 'Добавить программу'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="plan-form">
          <div className="form-group">
            <label>Название программы *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: Программа для начинающих"
              required
            />
          </div>

          <div className="form-group">
            <label>Иконка</label>
            <div className="icon-selector">
              {icons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  className={`icon-option ${formData.image === icon ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, image: icon }))}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Уровень сложности *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Дней в неделю *</label>
              <input
                type="number"
                name="daysPerWeek"
                value={formData.daysPerWeek}
                onChange={handleChange}
                min="1"
                max="7"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Длительность *</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Например: 8 недель"
              required
            />
          </div>

          <div className="form-group">
            <label>Цель программы *</label>
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="Например: Набор массы"
              required
            />
          </div>

          <div className="form-group">
            <label>Описание *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Опишите программу тренировок..."
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-submit">
              {plan ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPlanModal;