import React ,{useEffect, useState}from "react";
import QuestionForm from "./QuestionForm";


function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions))
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      });
  }
  

  return (
    <section>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question)=>(
        <li key={question.id}>{question.prompt}
        <button onClick={() => handleDeleteQuestion(question.id)}>Delete Question
        </button>
        </li>
      ))}</ul>
    </section>
  );
}

export default QuestionList;
