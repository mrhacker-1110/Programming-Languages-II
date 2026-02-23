import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>💪 FitTracker Pro</h2>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><a href="#exercises" onClick={() => scrollToSection('exercises')} className="nav-link">Упражнения</a></li>
            <li><a href="#statistics" onClick={() => scrollToSection('statistics')} className="nav-link">Статистика</a></li>
            <li><a href="#progress" className="nav-link">Прогресс</a></li>
            <li><a href="#plans" className="nav-link">Программы</a></li>
            <li><a href="#nutrition" className="nav-link">Питание</a></li>
            <li><a href="#goals" className="nav-link">Цели</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="btn-login">Войти</button>
          <button className="btn-signup">Регистрация</button>
        </div>
      </div>
    </header>
  );
}

export default Header;