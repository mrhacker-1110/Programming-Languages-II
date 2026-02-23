import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNutrition } from '../../store';
import './NutritionPlan.css';

function NutritionPlan() {
  const { nutrition, nutritionLoading } = useSelector((state) => state.exercises);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNutrition());
  }, [dispatch]);

  const getMealIcon = (mealTime) => {
    switch(mealTime) {
      case 'Завтрак': return '🌅';
      case 'Обед': return '☀️';
      case 'Ужин': return '🌙';
      case 'Перекус': return '🍎';
      default: return '🍽️';
    }
  };

  const totalCalories = nutrition.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = nutrition.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = nutrition.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = nutrition.reduce((sum, meal) => sum + meal.fats, 0);

  if (nutritionLoading) {
    return (
      <section id="nutrition" className="nutrition-section">
        <div className="nutrition-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <h2>Загрузка плана питания...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="nutrition" className="nutrition-section">
      <div className="nutrition-container">
        <div className="section-header">
          <h2>🥗 План питания</h2>
          <p>Правильное питание - ключ к результату • Загружено из JSON</p>
        </div>

        <div className="nutrition-summary">
          <h3>📊 Итого за день</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-icon">🔥</div>
              <div>
                <p className="summary-label">Калории</p>
                <p className="summary-value">{totalCalories} ккал</p>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon">🥩</div>
              <div>
                <p className="summary-label">Белки</p>
                <p className="summary-value">{totalProtein} г</p>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon">🍞</div>
              <div>
                <p className="summary-label">Углеводы</p>
                <p className="summary-value">{totalCarbs} г</p>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon">🥑</div>
              <div>
                <p className="summary-label">Жиры</p>
                <p className="summary-value">{totalFats} г</p>
              </div>
            </div>
          </div>
        </div>

        <div className="meals-grid">
          {nutrition.map((meal) => (
            <div key={meal.id} className="meal-card">
              <div className="meal-header">
                <div className="meal-time">
                  <span className="time-icon">{getMealIcon(meal.mealTime)}</span>
                  <span className="time-label">{meal.mealTime}</span>
                </div>
                <div className="meal-calories">{meal.calories} ккал</div>
              </div>

              <h3>{meal.name}</h3>

              <div className="macros">
                <div className="macro-item">
                  <span className="macro-label">Белки</span>
                  <span className="macro-value">{meal.protein}г</span>
                </div>
                <div className="macro-item">
                  <span className="macro-label">Углеводы</span>
                  <span className="macro-value">{meal.carbs}г</span>
                </div>
                <div className="macro-item">
                  <span className="macro-label">Жиры</span>
                  <span className="macro-value">{meal.fats}г</span>
                </div>
              </div>

              <div className="ingredients">
                <h4>Состав:</h4>
                <ul>
                  {meal.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <button className="meal-btn">Добавить в рацион</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NutritionPlan;