import { useState, useEffect } from "react";
import useSWR from "swr";
import useQuizStore from "../../store/quizStore";
import Navigation from "../navigation/Index";

export default function Quiz() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data:questions, error, isLoading } = useSWR("/api/quiz", fetcher);

  //setQuestions(questions);
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    incrementScore,
    showResults,
    setShowResults,
    setShuffledQuestions,
    setQuestions
  } = useQuizStore();

  //setQuestionsIndex(questions);

  
 /*  useEffect(() => {
    if (questions) {
      setQuestions(questions);
      setShuffledQuestions(shuffleQuestions(questions));
    }
  }, [questions, setShuffledQuestions, setQuestions]); */
  
  const shuffleQuestions = (questions) => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, 5); // Select the first 5 questions
  };

  if (isLoading) {
    return <div>is loading...</div>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }
console.log("questions:",questions);
  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      incrementScore();
    }

    if (currentQuestionIndex === 4) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const shuffledQuestions= shuffleQuestions(questions)
  const currentQuestionData = shuffledQuestions[currentQuestionIndex];

  
  return (
    <>
    <Navigation/>
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      {!showResults ? (
        <div>
          <h1 className="text-3xl font-bold">Quiz</h1>
          <p>{currentQuestionData.text}</p>
          <ul className="divide-y divide-gray-300">
            {currentQuestionData.options.map((option) => (
              <li
                key={option.id}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleAnswerClick(option.isCorrect)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Results</h1>
          <p>You scored {score} out of 5</p>
          <p>Play again?</p>
          <button
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      )}
    </div>
    </>
  );
}
