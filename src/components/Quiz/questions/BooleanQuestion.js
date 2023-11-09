import { decode } from "html-entities";

export default function BooleanQuestion(props) {
    // Show if question is wrong using the background color.
    let result_class = "";
    if (props.is_done_playing) {
        result_class = props.question.result ? "bg-green-200" : "bg-red-200";
    }

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
                <div className="flex items-center gap-1  shadow py-1 px-2 bg-gray-100 rounded-md">
                    <input
                        id={`true-${props.question.id}`}
                        type="radio"
                        name={`question-${props.question.id}`}
                        value={true}
                        onChange={() =>
                            props.onAnswerQuestionHanldler(
                                props.question.id,
                                "True"
                            )
                        }
                        className="h-5 w-5 rounded-full border-gray-300 focus:ring-transparent focus:ring-0"
                    />
                    <label
                        htmlFor={`true-${props.question.id}`}
                        className="text-md"
                    >
                        True
                    </label>
                </div>
                <div className="flex items-center gap-1  shadow py-1 px-2 bg-gray-100 rounded-md">
                    <input
                        id={`false-${props.question.id}`}
                        type="radio"
                        name={`question-${props.question.id}`}
                        value={false}
                        onChange={() =>
                            props.onAnswerQuestionHanldler(
                                props.question.id,
                                "False"
                            )
                        }
                        className="h-5 w-5 rounded-full border-gray-300 focus:ring-transparent focus:ring-0"
                    />
                    <label
                        htmlFor={`false-${props.question.id}`}
                        className="text-md"
                    >
                        False
                    </label>
                </div>
            </div>
        </li>
    );
}
