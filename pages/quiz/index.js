import { useState, useEffect } from "react";
import styled from "styled-components";
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
    <StyledSection>
      {!showResults ? (
        <div>
          <h1>Quiz</h1>
          <p>{currentQuestionData.text}</p>
          <ul>
            {currentQuestionData.options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleAnswerClick(option.isCorrect)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>Results</h1>
          <p>You scored {score} out of 5</p>
          <p>Play again?</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 300px;
  margin: 2vh auto;
  border-radius: 8px;
  border: 2px solid #ccc;

  img {
    width: 200px;
  }
`;
