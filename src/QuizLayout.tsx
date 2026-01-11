import {
    CheckCircleIcon,
    PlusCircleIcon,
    ArrowRightIcon,
} from "@heroicons/react/20/solid";

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

export default function QuizLayout({
    questions,
    status,
    onChangeAnswer,
    onSetStatus,
}: {
    questions: QuestionType[];
    status: "setup" | "playing" | "done";
    onChangeAnswer: (question_id: string, answer: string) => void;
    onSetStatus: (status: "done" | "setup") => void;
}) {

    function decodeHtml(html: string) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div className="py-10 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative ">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    {status == "playing" && questions.length == 0 ? (
                        <LoadingSkeleton />
                    ) : (
                        <>
                            <div className="text-center">
                                <h2 className="text-3xl tracking-tight text-balance text-gray-900 sm:text-4xl">
                                    <strong>{decodeHtml(questions[0].category)}</strong>{" "}
                                    Quiz
                                </h2>
                                <p className="mt-4 text-lg/8 text-gray-700">
                                    Answer each question and let’s see how much
                                    you really know.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 mt-10">
                                {questions.map((question: QuestionType) => (
                                    <EachQuestion
                                        key={question.id}
                                        question={question}
                                        onDecodeHTML={decodeHtml}
                                        onChangeAnswer={onChangeAnswer}
                                        status={status}
                                    />
                                ))}
                            </div>
                            {status == "done" ? (
                                <button
                                    onClick={() => onSetStatus("setup")}
                                    type="button"
                                    className="fixed right-4 bottom-4 flex justify-center items-center rounded-md bg-cyan-800 px-3.5 py-2.5 font-semibold text-white shadow-xs hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                >
                                    <span>New Quiz</span>
                                    <PlusCircleIcon className="h-5 w-5 ml-2" />
                                </button>
                            ) : (
                                <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
                                    <button
                                        onClick={() => onSetStatus("done")}
                                        type="button"
                                        className="w-2xs flex justify-between items-center rounded-md bg-cyan-800 px-3.5 py-2.5 font-semibold text-white shadow-xs hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                    >
                                        <span>Validate Answers</span>
                                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function EachQuestion({
    question,
    onChangeAnswer,
    status,
    onDecodeHTML
}: {
    question: QuestionType;
    onChangeAnswer: (question_id: string, answer: string) => void;
    status: "setup" | "playing" | "done";
    onDecodeHTML: (html:string) => string
}) {
    

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6">
                <p className="text-lg font-medium">
                    {onDecodeHTML(question.question)}
                </p>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {[
                        ...question.incorrect_answers,
                        question.correct_answer,
                    ].map((option: string) => {

                        let label_bg: string = "bg-white";
                        if (status == "done") {
                            if (option == question.answer) {
                                if (option == question.correct_answer) {
                                    label_bg = "bg-green-300"
                                } else {
                                    label_bg = 'bg-red-300'
                                }
                            }else {
                                if(option == question.correct_answer) {
                                    label_bg = "bg-green-300"
                                }
                            }
                        }

                        return (
                            <label
                                key={question.id + option}
                                aria-label={onDecodeHTML(option)}
                                className={`group relative flex rounded-lg border border-gray-300 ${label_bg} p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-cyan-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1`}
                            >
                                <input
                                    defaultValue={question.id}
                                    onChange={() =>
                                        onChangeAnswer(question.id, option)
                                    }
                                    name={question.id}
                                    disabled={status == "done"}
                                    type="radio"
                                    className="absolute inset-0 appearance-none focus:outline-none"
                                />
                                <span className="block flex-1 text-sm font-medium text-gray-900">
                                    {onDecodeHTML(option)}
                                </span>
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="invisible size-5 text-cyan-600 group-has-checked:visible"
                                />
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <>
            <div className="flex items-center flex-col text-center animate-pulse">
                <p className="h-4 bg-gray-300 rounded-sm w-3/5 mb-6"></p>
                <p className="h-3.5 bg-gray-300 rounded-sm w-2/5"></p>
            </div>
            <div className="flex flex-col gap-4 mt-10 animate-pulse">
                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="px-4 py-5 sm:px-6">
                        <p className="h-4 bg-gray-300 rounded-sm w-3/5"></p>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <label className="group relative flex rounded-lg border border-gray-200 bg-gray-300 p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-cyan-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
                                <input
                                    name="mailing-list"
                                    type="radio"
                                    className="absolute inset-0 appearance-none focus:outline-none"
                                />
                                <span className="block flex-1 text-sm font-medium text-gray-900"></span>
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="invisible size-5 text-cyan-600 group-has-checked:visible"
                                />
                            </label>
                            <label className="group relative flex rounded-lg border border-gray-200 bg-gray-300 p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-cyan-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
                                <input
                                    name="mailing-list"
                                    type="radio"
                                    className="absolute inset-0 appearance-none focus:outline-none"
                                />
                                <span className="block flex-1 text-sm font-medium text-gray-900"></span>
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="invisible size-5 text-cyan-600 group-has-checked:visible"
                                />
                            </label>
                            <label className="group relative flex rounded-lg border border-gray-200 bg-gray-300 p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-cyan-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
                                <input
                                    name="mailing-list"
                                    type="radio"
                                    className="absolute inset-0 appearance-none focus:outline-none"
                                />
                                <span className="block flex-1 text-sm font-medium text-gray-900"></span>
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="invisible size-5 text-cyan-600 group-has-checked:visible"
                                />
                            </label>
                            <label className="group relative flex rounded-lg border border-gray-200 bg-gray-300 p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-cyan-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25">
                                <input
                                    name="mailing-list"
                                    type="radio"
                                    className="absolute inset-0 appearance-none focus:outline-none"
                                />
                                <span className="block flex-1 text-sm font-medium text-gray-900"></span>
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="invisible size-5 text-cyan-600 group-has-checked:visible"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
