import { useState } from "react";
import FootNote from "../UI/FootNote";
import Header from "../UI/Header";
import RequestQuizForm from "./RequestQuizForm";
import QuestionsList from "./questions/QuestionsList";

export default function QuizDashboard() {
    const [questions, setQuestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDonePlaying, setIsDonePlaying] = useState(false);

    // Update the "answer" property
    const answerQuestionHandler = (id, answer) => {
        setQuestions(
            questions.map((question) => {
                if (question.id === id) question.answer = answer;
                return question;
            })
        );
    };

    // Submit questions to see results
    const submitQuestionsHandler = () => {
        setQuestions(
            questions.map((question) => {
                question.result =
                    question.answer === question.correct_answer ? true : false;
                return question;
            })
        );
        setIsDonePlaying(true);
    };

    // Create a new match
    const resetQuizHandler = () => {
        setQuestions([]);
        setIsPlaying(false);
        setIsDonePlaying(false);
    };

    return (
        <>
            <Header title="Quiz Game" />
            <div>
                <RequestQuizForm
                    searching={isSearching}
                    onSetIsSearching={(status) => setIsSearching(status)}
                    onSetQuestions={(questions) => setQuestions(questions)}
                    is_playing={isPlaying}
                    onSetIsPlaying={setIsPlaying}
                />
                {isPlaying && (
                    <QuestionsList
                        onAnswerQuestion={answerQuestionHandler}
                        onSubmitQuestionHandler={submitQuestionsHandler}
                        is_done_playing={isDonePlaying}
                        questions={questions}
                        onResetQuizHandler={resetQuizHandler}
                    />
                )}
            </div>
            <FootNote>
                <p className="text-sm text-gray-400 text-end">
                    Powered by{" "}
                    <a href="https://opentdb.com/" className="text-blue-400">
                        Open Trivia
                    </a>
                </p>
            </FootNote>
        </>
    );
}
