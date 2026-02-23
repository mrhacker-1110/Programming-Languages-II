import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkoutPlans, deleteWorkoutPlan, setSelectedPlan } from '../../store';
import AddPlanModal from '../AddPlanModal/AddPlanModal';
import PlanDetail from '../PlanDetail/PlanDetail';
import './WorkoutPlans.css';

function WorkoutPlans() {
  const { workoutPlans, plansLoading, selectedPlan } = useSelector((state) => state.exercises);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    dispatch(fetchWorkoutPlans());
  }, [dispatch]);

  const getLevelColor = (level) => {
    switch(level) {
      case 'Новичок': return '#4CAF50';
      case 'Средний': return '#FF9800';
      case 'Продвинутый': return '#f44336';
      default: return '#667eea';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить эту программу?')) {
      dispatch(deleteWorkoutPlan(id));
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleViewDetail = (plan) => {
    dispatch(setSelectedPlan(plan));
  };

  if (plansLoading) {
    return (
      <section id="plans" className="plans-section">
        <div className="plans-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <h2>Загрузка программ...</h2>
          </div>
        </div>
      </section>
    );
  }

  // Показываем детальный вид если программа выбрана
  if (selectedPlan) {
    return <PlanDetail />;
  }

  return (
    <section id="plans" className="plans-section">
      <div className="plans-container">
        <div className="section-header">
          <h2>🎯 Программы тренировок</h2>
          <p>Выбери подходящую программу для своих целей • Загружено из JSON</p>
        </div>

        <div className="plans-actions">
          <button className="add-plan-btn" onClick={handleAddNew}>
            <span>+</span> Создать программу
          </button>
          <div className="plans-count">
            Всего программ: <strong>{workoutPlans.length}</strong>
          </div>
        </div>

        <div className="plans-grid">
          {workoutPlans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="plan-icon">{plan.image}</div>
              
              <h3>{plan.title}</h3>
              <p className="plan-description">{plan.description}</p>

              <div className="plan-details">
                <div className="detail-row">
                  <span className="detail-label">Уровень:</span>
                  <span 
                    className="level-badge"
                    style={{ backgroundColor: getLevelColor(plan.level) }}
                  >
                    {plan.level}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">⏱️ Длительность:</span>
                  <span className="detail-value">{plan.duration}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">📅 Дней в неделю:</span>
                  <span className="detail-value">{plan.daysPerWeek}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">🎯 Цель:</span>
                  <span className="detail-value">{plan.goal}</span>
                </div>
              </div>

              <div className="plan-actions">
                <button className="plan-btn-view" onClick={() => handleViewDetail(plan)}>
                  👁️ Подробнее
                </button>
                <button className="plan-btn-edit" onClick={() => handleEdit(plan)}>
                  ✏️
                </button>
                <button className="plan-btn-delete" onClick={() => handleDelete(plan.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {workoutPlans.length === 0 && (
          <div className="empty-state">
            <h2>😔 Программ пока нет</h2>
            <p>Создайте первую программу тренировок</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddPlanModal 
          onClose={() => setIsModalOpen(false)}
          plan={editingPlan}
        />
      )}
    </section>
  );
}

export default WorkoutPlans;