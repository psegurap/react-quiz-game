import { useState } from "react";
import "./App.css";
import Setup from "./Setup";
import QuizLayout from "./QuizLayout";

type QuestionType = {
    id: string;
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answer?: null | string;
};

type StatusType = "setup" | "playing" | "done";

function App() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [status, setStatus] = useState<StatusType>("setup");

    async function requestQuestions(category_id: number) {
        setStatus("playing");

        const responsePromise: Promise<Response> = fetch(
            `https://opentdb.com/api.php?amount=10&category=${category_id}&type=multiple`
        );

        const response: Response = await responsePromise;

        if (response.ok) {
            const data: {
                response_code: number;
                results: QuestionType[];
            } = await response.json();

            // insert questions into "questions" state
            setQuestions(
                data.results.map((question: QuestionType, index: number) => {
                    question.id = "question_" + index;
                    question.answer = null;
                    return question;
                })
            );
            console.log(data);
        } else {
            console.error("Request failed with status:", response.status);
        }
    }

    function handleChangeAnswer(question_id: string, answer: string) {
        setQuestions(
            questions.map((question: QuestionType) => {
                if (question.id == question_id) {
                    question.answer = answer;
                    return question;
                }

                return question;
            })
        );
    }

    return (
        <>
            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Quiz Game
                    </h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {status == "setup" ? (
                        <Setup onRequestQuestions={requestQuestions} />
                    ) : (
                        <QuizLayout
                            questions={questions}
                            status={status}
                            onChangeAnswer={handleChangeAnswer}
                            onSetStatus={setStatus}
                        />
                    )}
                </div>
            </main>
        </>
    );
}

export default App;
