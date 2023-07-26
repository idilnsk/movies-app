import {create} from "zustand";

const useQuizStore=create((set)=>({
    questions:[],
    currentQuestionIndex:0,
    score:0,
    showResults:false,
    shuffledQuestions:[],

    setQuestions:(questions)=>set({questions}),
    setCurrentQuestionIndex:(index)=>set({currentQuestionIndex:index}),
    incrementScore:()=>set((state)=>({score:state.score+1})),
    setShowResults: (showResults) => set({ showResults }), // Add the setShowResults action
  setShuffledQuestions: (shuffledQuestions) => set({ shuffledQuestions }), // Add the setShuffledQuestions action
  resetQuiz: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      shuffledQuestions: [],
    }),
}));

export default useQuizStore;