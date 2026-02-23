import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронная загрузка упражнений с задержкой
export const fetchExercises = createAsyncThunk(
  'exercises/fetchExercises',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = await fetch('/data/exercises.json');
    const data = await response.json();
    return data.exercises;
  }
);

// Асинхронная загрузка программ тренировок
export const fetchWorkoutPlans = createAsyncThunk(
  'exercises/fetchWorkoutPlans',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = await fetch('/data/workoutPlans.json');
    const data = await response.json();
    return data.plans;
  }
);

// Асинхронная загрузка питания
export const fetchNutrition = createAsyncThunk(
  'exercises/fetchNutrition',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch('/data/nutrition.json');
    const data = await response.json();
    return data.meals;
  }
);

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [],
    workoutPlans: [],
    nutrition: [],
    selectedExercise: null,
    selectedPlan: null,
    filter: 'Все',
    loading: false,
    plansLoading: false,
    nutritionLoading: false,
    error: null
  },
  reducers: {
    // CRUD для упражнений
    addExercise: (state, action) => {
      state.exercises.push({
        ...action.payload,
        id: Date.now()
      });
    },
    deleteExercise: (state, action) => {
      state.exercises = state.exercises.filter(ex => ex.id !== action.payload);
    },
    updateExercise: (state, action) => {
      const index = state.exercises.findIndex(ex => ex.id === action.payload.id);
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSelectedExercise: (state, action) => {
      state.selectedExercise = action.payload;
    },
    
    // CRUD для программ тренировок
    addWorkoutPlan: (state, action) => {
      state.workoutPlans.push({
        ...action.payload,
        id: Date.now()
      });
    },
    updateWorkoutPlan: (state, action) => {
      const index = state.workoutPlans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.workoutPlans[index] = action.payload;
      }
    },
    deleteWorkoutPlan: (state, action) => {
      state.workoutPlans = state.workoutPlans.filter(plan => plan.id !== action.payload);
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Упражнения
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Программы тренировок
      .addCase(fetchWorkoutPlans.pending, (state) => {
        state.plansLoading = true;
      })
      .addCase(fetchWorkoutPlans.fulfilled, (state, action) => {
        state.plansLoading = false;
        state.workoutPlans = action.payload;
      })
      .addCase(fetchWorkoutPlans.rejected, (state) => {
        state.plansLoading = false;
      })
      // Питание
      .addCase(fetchNutrition.pending, (state) => {
        state.nutritionLoading = true;
      })
      .addCase(fetchNutrition.fulfilled, (state, action) => {
        state.nutritionLoading = false;
        state.nutrition = action.payload;
      })
      .addCase(fetchNutrition.rejected, (state) => {
        state.nutritionLoading = false;
      });
  }
});

export const { 
  addExercise, 
  deleteExercise, 
  updateExercise, 
  setFilter, 
  setSelectedExercise,
  addWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  setSelectedPlan
} = exercisesSlice.actions;

export const store = configureStore({
  reducer: {
    exercises: exercisesSlice.reducer
  }
});