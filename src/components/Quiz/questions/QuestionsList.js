import BooleanQuestion from "./BooleanQuestion";
import MultipleQuestion from "./MultipleQuestion";

export default function QuestionsList(props) {
    return (
        <div className="px-3 pb-16">
            <div>
                <p className="text-2xl text-gray-500 mb-3 text-center">
                    {!props.is_done_playing ? "Let's play!" : "Another match?"}
                </p>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-700 ">
                        {!props.is_done_playing
                            ? props.questions.filter(
                                  (question) => question.answer === ""
                              ).length + " questions left"
                            : props.questions.filter(
                                  (question) => question.result === true
                              ).length +
                              "/" +
                              props.questions.length +
                              " were correct"}
                    </span>
                    <button
                        onClick={props.onResetQuizHandler}
                        type="button"
                        className="text-sm bg-transparent text-gray-600 font-medium underline underline-offset-2"
                    >
                        New match
                    </button>
                </div>
                <hr className="mt-2" />
            </div>
            <ul className="pt-2 gap-4 flex flex-col">
                {props.questions.map((question) => {
                    return question.type === "boolean" ? (
                        <BooleanQuestion
                            onAnswerQuestionHanldler={(id, answer) =>
                                props.onAnswerQuestion(id, answer)
                            }
                            key={question.id}
                            question={question}
                            is_done_playing={props.is_done_playing}
                        />
                    ) : (
                        <MultipleQuestion
                            onAnswerQuestionHanldler={(id, answer) =>
                                props.onAnswerQuestion(id, answer)
                            }
                            key={question.id}
                            question={question}
                            is_done_playing={props.is_done_playing}
                        />
                    );
                })}
            </ul>
            {!props.is_done_playing && (
                <button
                    type="button"
                    onClick={props.onSubmitQuestionHandler}
                    className="text-lg mt-2 w-full px-4 text-white text-center font-bold py-2 bg-blue-500 rounded shadow-lg w-24"
                >
                    Submit
                </button>
            )}
        </div>
    );
}
