import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header/Header';
import ExerciseList from './components/ExerciseList/ExerciseList';
import Statistics from './components/Statistics/Statistics';
import WorkoutPlans from './components/WorkoutPlans/WorkoutPlans';
import NutritionPlan from './components/NutritionPlan/NutritionPlan';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <main>
          <ExerciseList />
          <Statistics />
          <WorkoutPlans />
          <NutritionPlan />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;