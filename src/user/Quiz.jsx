import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";

export default function Quiz() {

    const { quizName } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, [quizName]);

    const fetchQuestions = async () => {
        try {
            const q = query(
                collection(db, "quizes"),
                where("quizName", "==", quizName)
            );

            const snap = await getDocs(q);
            let arr = [];

            snap.forEach(doc => {
                arr.push({ id: doc.id, ...doc.data() });
            });

            setQuestions(arr);
        } catch (err) {
            console.error("Error fetching quiz questions", err);
        }
    };

    const selectOption = (option) => {
        setAnswers({
            ...answers,
            [currentIndex]: option
        });
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    if (!questions.length && !showResult) {
        return (
            <div className="container-fluid quiz_bg min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center text-white">
        <div className="col-6 p-5 shadow bg-secondary text-center rounded-4">

          <h3>Loading questions...</h3>
        </div>
      </div>
    </div>
        )
    }

    if (showResult) {
  return (
    <div className="container-fluid quiz_bg min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center text-white">
        <div className="col-6 p-5 shadow bg-secondary text-center rounded-4">

          <h2>Quiz Result</h2>
          <hr />

          <h3>
            Score: {calculateScore()} / {questions.length}
          </h3>

          <button
            className="btn btn-light mt-4"
            onClick={() => navigate("/user_home")}
          >
            Back to Quiz Selection
          </button>

        </div>
      </div>
    </div>
  );
}



    const q = questions[currentIndex];

    return (
        <div className="container-fluid quiz_bg min-vh-100 d-flex justify-content-center align-items-center">

            <div class="row w-100 justify-content-center text-white">
                <div className="col-6 p-5 shadow bg-secondary text-center rounded-4">
                    <h3>{quizName} Quiz</h3>
                    <hr />
                    <h4>
                        {currentIndex + 1}. {q.question}
                    </h4>

                    <div className="radio_div">
                        {q.options.map((opt, index) => (
                            <div className="options mt-2" key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="option"
                                        checked={answers[currentIndex] === opt}
                                        onChange={() => selectOption(opt)}
                                    />
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>


                    <button className="btn btn-light m-2 mt-4 shadow "
                        onClick={prevQuestion}
                        disabled={currentIndex === 0}
                    >
                        Previous
                    </button>

                    <button className="btn btn-light m-2 mt-4 shadow "
                        onClick={nextQuestion}
                        disabled={answers[currentIndex] == null}
                    >
                        {currentIndex === questions.length - 1
                            ? "Submit"
                            : "Next"}
                    </button>
                </div>
            </div>


        </div>
    );
}
