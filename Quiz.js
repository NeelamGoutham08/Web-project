// import { useEffect, useState } from 'react';

// function Quiz() {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [quizCompleted, setQuizCompleted] = useState(false);
//     const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer

//     useEffect(() => {
//         fetch('http://localhost:4000/questions') // Ensure your backend is running on this port
//             .then(response => response.json())
//             .then(data => setQuestions(data))
//             .catch(error => console.error('Error fetching quiz:', error));
//     }, []);

//     const handleAnswerSelection = (selectedOption) => {
//         setSelectedAnswer(selectedOption);
//     };

//     const handleNextQuestion = () => {
//         if (selectedAnswer === questions[currentQuestionIndex]?.answer) {
//             setScore(prevScore => prevScore + 1);
//         }

//         if (currentQuestionIndex + 1 < questions.length) {
//             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//             setSelectedAnswer(null); // Reset selection for next question
//         } else {
//             setQuizCompleted(true);
//         }
//     };

//     if (!questions.length) return <p>Loading...</p>;

//     if (quizCompleted) {
//         return (
//             <div>
//                 <h1>Quiz Completed</h1>
//                 <h2>Your Score: {score} / {questions.length}</h2>
//             </div>
//         );
//     }

//     const currentQuestion = questions[currentQuestionIndex];
//     const options = [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4];

//     return (
//         <div>
//             <h1>Quiz</h1>
//             <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
//             <p>{currentQuestion.question}</p>
//             <ul>
//                 {options.map((option, index) => (
//                     <li key={index}>
//                         <button 
//                             onClick={() => handleAnswerSelection(option)} 
//                             style={{
//                                 backgroundColor: selectedAnswer === option ? "lightblue" : "white"
//                             }}>
//                             {option}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
//                 Next Question
//             </button>
//         </div>
//     );
// }

// export default Quiz;
import { useEffect, useState } from 'react';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        // Fetch 5 random questions from backend
        fetch('http://localhost:4000/questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching quiz:', error));
    }, []);

    const handleAnswer = (selectedOptionText) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedOptionText === currentQuestion.answer) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    if (questions.length === 0) return <p>Loading quiz...</p>;

    if (quizCompleted) {
        return (
            <div>
                <h1>Quiz Completed 🎉</h1>
                <h2>Your Score: {score} / {questions.length}</h2>
                <button onClick={() => window.location.reload()}>Play Again</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const options = [
        currentQuestion.option1,
        currentQuestion.option2,
        currentQuestion.option3,
        currentQuestion.option4,
    ];

    return (
        <div style={{ padding: '20px' ,backgroundColor:'lightpink',textAlign:"center"}}>
            <h1>Quiz App</h1>
            <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
            <p><strong>{currentQuestion.question}</strong></p>
            <ul style={{ listStyle: 'none', padding: 0 , color:'whitesmoke'}}>
                {options.map((option, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <button onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Quiz;