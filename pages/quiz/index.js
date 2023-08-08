import useSWR from "swr";
import useQuizStore from "../../store/quizStore";
import Navigation from "../navigation/Index";
import Footer from "@/movies-app/Footer";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Quiz() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: questions } = useSWR("/api/quiz", fetcher);

  const router = useRouter();

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    incrementScore,
    showResults,
    setShowResults,
    setShuffledQuestions,
    setQuestions,
    shuffledQuestions,
    resetQuiz,
    setSelectedAnswer,
    selectedAnswer,
    clearSelectedAnswer,
  } = useQuizStore();

  const resetQuizz = () => {
    router.reload();
  };

  useEffect(() => {
    if (questions && shuffledQuestions.length === 0) {
      setQuestions(questions);
      const shuffled = shuffleQuestions(questions);
      setShuffledQuestions(shuffled);
    }
  }, [questions]);

  const shuffleQuestions = (questions) => {
    {
      let array = [...questions]; // copy the questions
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array.slice(0, 5);
    }
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setTimeout(() => {
      clearSelectedAnswer();
      if (option.isCorrect) incrementScore();
      if (currentQuestionIndex === 4) {
        setShowResults(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1000);
  };
  const currentQuestionData = shuffledQuestions?.[currentQuestionIndex];
  console.log("currentQuestionData:", currentQuestionData);
  if (!currentQuestionData) return <div>Loading questions...</div>;

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12 mb-60">
        {!showResults ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Quiz</h1>
            <div className="p-4 rounded-lg border-2 border-purple-500">
              <p className="mb-4">{currentQuestionData.text}</p>
              <ul className="divide-y divide-gray-300">
                {currentQuestionData.options.map((option) => {
                  const isCorrectOption = option.isCorrect;
                  const isWrongOption =
                    selectedAnswer &&
                    !selectedAnswer.isCorrect &&
                    selectedAnswer.id === option.id;
                  const isSelectedCorrectOption =
                    selectedAnswer &&
                    selectedAnswer.isCorrect &&
                    selectedAnswer.id === option.id;

                    

                  return (
                    <li
                      key={option.id}
                      className={`cursor-pointer p-2 
                      ${
                        isWrongOption
                        ? "bg-red-500 text-white"
                        : isSelectedCorrectOption 
                        ? "bg-green-500 text-white" 
                        : "hover:bg-gray-100 hover:text-black"
                    } 
                    ${
                        isCorrectOption &&
                        selectedAnswer &&
                        !selectedAnswer.isCorrect
                        ? "bg-green-500 text-white"
                        : ""
                    }`}
                      onClick={() => handleAnswerClick(option)}
                    >
                      {option.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center border border-purple-500 p-8 rounded-lg max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Results</h1>
            <p>You scored {score} out of 5</p>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-purple-600"
              onClick={resetQuizz}
            >
              Restart
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
