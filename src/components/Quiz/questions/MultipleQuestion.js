import { decode } from "html-entities";

export default function MultipleQuestion(props) {
    let result_class = "";
    if (props.is_done_playing) {
        result_class = props.question.result ? "bg-green-200" : "bg-red-200";
    }

    let options = [
        ...props.question.incorrect_answers,
        props.question.correct_answer,
    ].sort();

    return (
        <li
            className={`p-3 rounded shadow ring-1 ring-gray-200 px-3 ${
                result_class !== "" ? result_class : "bg-white"
            }`}
        >
            <p className="leading-6 text-gray-900">
                {decode(props.question.question)}
            </p>
            <div className="relative mt-2 flex gap-3 flex-wrap">
                {props.is_done_playing && (
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white h-full left-1/2 opacity-50 rounded top-2/4 w-full"></div>
                )}
                {options.map((option, index) => (
                    <div
                        className="flex items-center gap-1 shadow py-1 px-2 bg-gray-100 rounded-md"
                        key={index}
                    >
                        <input
                            id={option}
                            type="radio"
                            value={option}
                            name={`question-${props.question.id}`}
                            onChange={() =>
                                props.onAnswerQuestionHanldler(
                                    props.question.id,
                                    option
                                )
                            }
                            className="h-5 w-5 rounded-full border-gray-300 focus:ring-transparent focus:ring-0"
                        />
                        <label htmlFor={option} className="text-md">
                            {decode(option)}
                        </label>
                    </div>
                ))}
            </div>
        </li>
    );
}
