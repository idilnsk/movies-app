import { create } from "zustand";

const useQuizStore = create((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  showResults: false,
  shuffledQuestions: [],
  selectedAnswer: null,

  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setShowResults: (showResults) => set({ showResults }),
  setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),  // New Setter for Selected Answer
  clearSelectedAnswer: () => set({ selectedAnswer: null }),

  // Initialize shuffledQuestions using a function. This prevents immediate execution.
  initializeShuffledQuestions: () => {
    if (typeof window !== "undefined") {
      const savedQuestions = localStorage.getItem('shuffledQuestions');
      return savedQuestions ? JSON.parse(savedQuestions) : [];
    }
    return [];
  },

  setShuffledQuestions: (shuffledQuestions) => {
    if (typeof window !== "undefined") {
      // Save shuffledQuestions to localStorage
      localStorage.setItem('shuffledQuestions', JSON.stringify(shuffledQuestions));
    }
    set({ shuffledQuestions });
  },


  resetQuiz: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('shuffledQuestions');
    }
    set({
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      shuffledQuestions: [],
    });
  }
}));

export default useQuizStore;
