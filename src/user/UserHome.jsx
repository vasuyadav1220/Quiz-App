import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config.js";
import '../App.css';

export default function UserHome() {

  const [quizList, setQuizList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizNames();
  }, []);

  const fetchQuizNames = async () => {
    try {
      const snap = await getDocs(collection(db, "quizes"));
      const quizSet = new Set();

      snap.forEach(doc => {
        quizSet.add(doc.data().quizName);
      });

      setQuizList([...quizSet]);
    } catch (err) {
      console.error("Error fetching quiz names", err);
    }
  };

  const startQuiz = () => {
    if (!selectedQuiz) return;
    navigate(`/quiz/${selectedQuiz}`);
  };

  return (
    <div className="container-fluid quiz_bg min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
<div className="col-4 p-5 shadow bg-secondary text-center rounded-4">
        <h2 className="text-white">Select Quiz</h2>

      <select className="form-select shadow rounded-5"
        value={selectedQuiz}
        onChange={(e) => setSelectedQuiz(e.target.value)}
      >
        <option value="">-- Select Quiz --</option>
        {quizList.map((quiz, index) => (
          <option key={index} value={quiz}>
            {quiz}
          </option>
        ))}
      </select>

      <button className="btn btn-light mt-4 shadow rounded-5"
        disabled={!selectedQuiz}
        onClick={startQuiz}
      >
        Start Quiz
      </button>
</div>
      </div>

    </div>
  );
}
