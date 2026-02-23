import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>💪 FitTracker Pro</h3>
            <p>Твой персональный фитнес-помощник</p>
          </div>

          <div className="footer-section">
            <h4>Навигация</h4>
            <ul>
              <li><a href="#exercises">Упражнения</a></li>
              <li><a href="#statistics">Статистика</a></li>
              <li><a href="#progress">Прогресс</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <ul>
              <li>📧 support@fittracker.com</li>
              <li>📱 +996 555 123 456</li>
              <li>📍 Бишкек, Кыргызстан</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 FitTracker Pro. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;