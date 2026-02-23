import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlan } from '../../store';
import './PlanDetail.css';

function PlanDetail() {
  const selectedPlan = useSelector((state) => state.exercises.selectedPlan);
  const dispatch = useDispatch();

  if (!selectedPlan) return null;

  const handleBack = () => {
    dispatch(setSelectedPlan(null));
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Новичок': return '#4CAF50';
      case 'Средний': return '#FF9800';
      case 'Продвинутый': return '#f44336';
      default: return '#667eea';
    }
  };

  return (
    <section className="plan-detail-section">
      <div className="detail-container">
        <button className="back-btn" onClick={handleBack}>
          ← Назад к программам
        </button>

        <div className="detail-card">
          <div className="detail-header">
            <div className="header-content">
              <div className="plan-icon-large">{selectedPlan.image}</div>
              <div>
                <h1>{selectedPlan.title}</h1>
                <div 
                  className="difficulty-badge"
                  style={{ backgroundColor: getLevelColor(selectedPlan.level) }}
                >
                  {selectedPlan.level}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-content">
            <div className="content-section">
              <h3>📝 Описание программы</h3>
              <p>{selectedPlan.description}</p>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-icon">⏱️</span>
                <div>
                  <p className="stat-label">Длительность</p>
                  <p className="stat-value">{selectedPlan.duration}</p>
                </div>
              </div>

              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <div>
                  <p className="stat-label">Тренировок в неделю</p>
                  <p className="stat-value">{selectedPlan.daysPerWeek} дня</p>
                </div>
              </div>

              <div className="stat-item">
                <span className="stat-icon">🎯</span>
                <div>
                  <p className="stat-label">Цель</p>
                  <p className="stat-value">{selectedPlan.goal}</p>
                </div>
              </div>
            </div>

            <div className="schedule-section">
              <h3>📋 Примерное расписание</h3>
              <div className="schedule-grid">
                <div className="schedule-day">
                  <div className="day-number">1</div>
                  <h4>Понедельник</h4>
                  <p>Грудь + Трицепс</p>
                  <span className="duration">60 мин</span>
                </div>
                <div className="schedule-day">
                  <div className="day-number">2</div>
                  <h4>Среда</h4>
                  <p>Спина + Бицепс</p>
                  <span className="duration">60 мин</span>
                </div>
                <div className="schedule-day">
                  <div className="day-number">3</div>
                  <h4>Пятница</h4>
                  <p>Ноги + Плечи</p>
                  <span className="duration">75 мин</span>
                </div>
              </div>
            </div>

            <div className="content-section tips-section">
              <h3>💡 Рекомендации</h3>
              <ul className="tips-list">
                <li>
                  <span className="tip-icon">✓</span>
                  Соблюдайте технику выполнения упражнений
                </li>
                <li>
                  <span className="tip-icon">✓</span>
                  Отдыхайте между подходами 60-90 секунд
                </li>
                <li>
                  <span className="tip-icon">✓</span>
                  Постепенно увеличивайте рабочий вес
                </li>
                <li>
                  <span className="tip-icon">✓</span>
                  Не забывайте о правильном питании
                </li>
                <li>
                  <span className="tip-icon">✓</span>
                  Высыпайтесь - сон важен для восстановления
                </li>
              </ul>
            </div>

            <div className="action-buttons">
              <button className="action-btn primary">
                🚀 Начать программу
              </button>
              <button className="action-btn secondary">
                📊 Отслеживать прогресс
              </button>
              <button className="action-btn success">
                📥 Скачать PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanDetail;