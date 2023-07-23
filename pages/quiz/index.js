import { useState, useEffect } from "react";
import useSWR from "swr";

export default function Quiz() {
  const { data: questions } = useSWR("/api/quiz");

  //fetch data from server router from the api/quiz folder
  //const { data:questions, isLoading, error } = useSWR(`/api/quiz`);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const shuffleQuestions = (questions) => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, 5); // Select the first 5 questions
  };

  useEffect(() => {
    if (questions) {
      setShuffledQuestions(shuffleQuestions(questions));
    }
  }, [questions]);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion === 4) {
      setShowResults(true);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };
  if (shuffledQuestions.length === 0) {
    return <div>loading...</div>;
  }
  const currentQuestionData = shuffledQuestions[currentQuestion];
  return (
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
  );
}
